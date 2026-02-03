# Handbag Favorites App - Implementation Report

> **Assignment**: Favorite List by using AsyncStorage  
> **Platform**: React Native (Expo)  
> **Student**: [Điền tên sinh viên]

---

## Tổng Quan Dự Án

Ứng dụng quản lý danh sách túi xách yêu thích, cho phép người dùng xem, lọc, tìm kiếm và lưu sản phẩm yêu thích vào thiết bị sử dụng AsyncStorage.

---

## Task 1: UI & Navigation ✅

### Yêu Cầu

- Tạo các màn hình: Homepage, Detail, FavoritesList
- Sử dụng FlatList, Image, Pressable
- Navigation với Bottom Tabs
- Dữ liệu từ MockAPI.io

### Triển Khai

| Yêu cầu              | File                             | Mô tả                                                                        |
| -------------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| **Bottom Tabs**      | `src/navigation/TabNavigator.js` | Sử dụng `@react-navigation/bottom-tabs` để chuyển đổi giữa Home và Favorites |
| **Home Screen**      | `src/screens/HomeScreen.js`      | Hiển thị danh sách túi xách với FlatList (2 cột)                             |
| **Detail Screen**    | `src/screens/DetailScreen.js`    | Chi tiết sản phẩm với ratings và comments                                    |
| **Favorites Screen** | `src/screens/FavoritesScreen.js` | Danh sách yêu thích với swipe-to-delete                                      |

### Chi Tiết Home Screen

```javascript
// Lọc theo thương hiệu
const filteredHandbags = handbags.filter((item) => {
  const matchesBrand = !selectedBrand || item.brand === selectedBrand;
  const matchesSearch =
    !searchQuery ||
    item.handbagName?.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesBrand && matchesSearch;
});

// Sắp xếp theo giá giảm dần
const sortedData = data.sort((a, b) => b.cost - a.cost);
```

### Hiển Thị Gender (Icon)

```javascript
// ProductCard.js - Hiển thị icon giới tính
<Icon
  name={item.gender ? "gender-male" : "gender-female"}
  size={16}
  color={item.gender ? colors.male : colors.female}
/>
```

### Hiển Thị Discount (%)

```javascript
// Chuyển từ decimal sang percentage
const discountPercent = Math.round(item.percentOff * 100);
// Hiển thị: -15% thay vì 0.15
```

---

## Task 2: Detail Screen & Feedback ✅

### Yêu Cầu

- Hiển thị đầy đủ thông tin túi xách
- Ratings hiển thị dạng sao
- Comments rõ ràng
- Ratings được nhóm theo giá trị

### Triển Khai

| Yêu cầu                 | File                           | Mô tả                                 |
| ----------------------- | ------------------------------ | ------------------------------------- |
| **Star Rating**         | `src/components/StarRating.js` | Component hiển thị sao từ 1-5         |
| **Rating Distribution** | `src/screens/DetailScreen.js`  | Biểu đồ phân bố ratings (5★, 4★, ...) |
| **Comments List**       | `src/screens/DetailScreen.js`  | Danh sách bình luận với sao đánh giá  |

### Nhóm Ratings Theo Giá Trị

```javascript
// DetailScreen.js
const ratingGroups = useMemo(() => {
  const groups = { 5: [], 4: [], 3: [], 2: [], 1: [] };
  handbag.ratings.forEach((rating) => {
    const value = Math.round(rating.value || 0);
    if (value >= 1 && value <= 5) {
      groups[value].push(rating);
    }
  });
  return groups;
}, [handbag?.ratings]);
```

---

## Task 3: Favorite Functionality ✅

### Yêu Cầu

- Add/Remove từ Home và Detail Screen
- Tìm kiếm trong danh sách yêu thích
- Hiển thị tất cả favorites
- Xóa một hoặc tất cả favorites

### Triển Khai

| Yêu cầu              | File                                | Mô tả                         |
| -------------------- | ----------------------------------- | ----------------------------- |
| **AsyncStorage**     | `src/services/storage.js`           | CRUD operations cho favorites |
| **State Management** | `src/store/favoritesStore.js`       | Zustand store quản lý state   |
| **Add/Remove**       | `ProductCard.js`, `DetailScreen.js` | Nút tim để toggle favorite    |

### AsyncStorage Implementation

```javascript
// storage.js - Lưu trữ với AsyncStorage
const FAVORITES_KEY = "@handbag_favorites";

export const addFavorite = async (handbag) => {
  const favorites = await getFavorites();
  const exists = favorites.some((item) => item.id === handbag.id);
  if (!exists) {
    const updatedFavorites = [...favorites, handbag];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  }
  return favorites;
};

export const removeFavorite = async (id) => {
  const favorites = await getFavorites();
  const updatedFavorites = favorites.filter((item) => item.id !== id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};
```

### Zustand Store

```javascript
// favoritesStore.js - State management
const useFavoritesStore = create((set, get) => ({
  favorites: [],

  addToFavorites: async (handbag) => {
    const updatedFavorites = await addFavorite(handbag);
    set({ favorites: updatedFavorites });
  },

  removeFromFavorites: async (id) => {
    const updatedFavorites = await removeFavorite(id);
    set({ favorites: updatedFavorites });
  },

  isFavorite: (id) => {
    return get().favorites.some((item) => item.id === id);
  },
}));
```

### Xóa Nhiều Favorites

```javascript
// Swipe-to-delete: Vuốt trái để xóa
// Multi-select: Nhấn giữ để chọn nhiều
// Delete selected: Xóa các mục đã chọn
// Clear All: Xóa toàn bộ
```

---

## Task 5: Optimization & UX ✅

### Yêu Cầu

- Chuyển màn hình nhanh
- UI/UX hấp dẫn và native
- Side effects hợp lý

### Triển Khai

| Tối ưu           | Mô tả                                              |
| ---------------- | -------------------------------------------------- |
| **useCallback**  | Memoize các function để tránh re-render            |
| **useMemo**      | Cache kết quả lọc/tính toán                        |
| **React.memo**   | Wrap components để tránh re-render không cần thiết |
| **keyExtractor** | Unique key cho FlatList items                      |

### Design System

```javascript
// theme.js - Centralized design tokens
export const colors = {
  primary: "#1C1917",
  accent: "#CA8A04",
  background: "#FAFAF9",
  // ...
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
export const borderRadius = { sm: 8, md: 12, lg: 16, xl: 24 };
```

---

## Cấu Trúc Thư Mục

```
my-app/
├── App.js                    # Entry point
├── src/
│   ├── components/
│   │   ├── ProductCard.js    # Card hiển thị sản phẩm
│   │   ├── BrandFilter.js    # Bộ lọc thương hiệu
│   │   └── StarRating.js     # Hiển thị sao đánh giá
│   ├── screens/
│   │   ├── HomeScreen.js     # Màn hình chính
│   │   ├── DetailScreen.js   # Chi tiết sản phẩm
│   │   └── FavoritesScreen.js # Danh sách yêu thích
│   ├── navigation/
│   │   ├── TabNavigator.js   # Bottom tab navigation
│   │   └── HomeStack.js      # Stack cho Home -> Detail
│   ├── services/
│   │   ├── api.js            # Gọi API MockAPI.io
│   │   └── storage.js        # AsyncStorage operations
│   ├── store/
│   │   └── favoritesStore.js # Zustand state management
│   └── theme.js              # Design tokens
└── .env                      # API URL configuration
```

---

## Công Nghệ Sử Dụng

| Công nghệ                    | Phiên bản | Mục đích             |
| ---------------------------- | --------- | -------------------- |
| React Native                 | 0.81      | Framework mobile     |
| Expo                         | 54        | Development platform |
| React Navigation             | 7.x       | Navigation           |
| AsyncStorage                 | 2.2       | Local storage        |
| Zustand                      | 5.0       | State management     |
| Axios                        | 1.13      | HTTP client          |
| React Native Paper           | 5.14      | UI components        |
| @expo/vector-icons           | -         | Icons                |
| react-native-gesture-handler | -         | Swipe gestures       |

---

## Hướng Dẫn Chạy Dự Án

```bash
# 1. Cài đặt dependencies
cd my-app
npm install

# 2. Chạy ứng dụng
npx expo start

# 3. Mở trên thiết bị
# - Nhấn 'a' cho Android emulator
# - Nhấn 'i' cho iOS simulator
# - Scan QR code bằng Expo Go app
```

---

## Demo Tính Năng

### 1. Home Screen

- Xem danh sách túi xách theo grid 2 cột
- Lọc theo thương hiệu (All, Burberry, Bvlgari, ...)
- Tìm kiếm theo tên
- Nhấn vào tim để thêm/xóa yêu thích

### 2. Detail Screen

- Xem ảnh lớn, giá, thương hiệu
- Xem ratings trung bình và phân bố
- Đọc comments từ người dùng khác
- Thêm/xóa khỏi favorites

### 3. Favorites Screen

- Xem danh sách đã lưu
- Vuốt trái để xóa nhanh
- Nhấn giữ để chọn nhiều và xóa
- Tìm kiếm trong favorites
- Xóa tất cả

---

## Kết Luận

Dự án đã hoàn thành đầy đủ các yêu cầu từ Task 1-3 và Task 5:

- ✅ UI/Navigation với Bottom Tabs
- ✅ Dữ liệu từ MockAPI.io
- ✅ Detail Screen với Ratings & Comments
- ✅ Favorite functionality với AsyncStorage
- ✅ UX tối ưu với gestures và animations
