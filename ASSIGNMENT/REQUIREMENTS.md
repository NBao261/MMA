# Assignment – Favorite List by using AsyncStorage

## Instructions

In this assignment, you will be extending the router to support the ability to save and retrieve a list of favorite handbags by each of the users. They should have the ability to save any handbags as their favorite handbags, retrieve all their favorite handbags, and remove one or all their favorite handbags.

## Assignment Overview

At the end of this assignment, you should have completed the following:

- Create a resource to **mockapi.io** tool which stores the data of handbags.
- Allowed users to select a handbag and add it to the list of favorites that are saved on their devices.
- Allowed users to retrieve the list of their favorite handbags from the **FavoritesList** screen.
- Delete one or all their favorite handbags from their Favorites List on devices.
- The data of handbags come from the **mockapi.io** tool.
- Screens must be switched back and forth quickly.

## Assignment Requirements

In this assignment, you will be supporting the public screens where the users can view all the handbags by brand and the detail of handbag. The users can retrieve their favorite handbags, search the handbag by name. They can add a list of handbags to their favorites and delete (all) the handbag(s). The data was declared as an array of objects. Each item contains a name representing the item’s name, image, and a unique id.

This assignment consists of the following three tasks (plus bonuses):

### Task 1: UI & Navigation - Assignment 1

In this task you will implement the screens such as: the **Homepage**, **Detail**, **FavoritesList**... Using some components that support your screens such as: `FlatList`, `Image`, `Pressable`.

- **Tech Stack**: React Navigation (Native Stack, Drawer, Bottom Tabs...), React Native UI Components (React Native Elements, Native Base, React Native Paper, Gluestack...), React Hook...
- **Data Source**: The data of Home and Detail screen come from the **mockapi.io** tool.
- **Home Screen**:
  - Show all the handbags which belong to the brand (filter handbags by press on a brand at this screen).
  - Display: Handbag Name, URI, and `percentOff` (displayed as a percentage, not a decimal value).
  - The `gender` value must stand out on this screen (e.g., styled with a male icon for the false value).
  - The handbag list should be displayed in **descending order by cost** and filtered by brand, retrieved from the MockAPI tool.
  - Use **Bottom Tabs** to switch all screens.
  - Design and arrange this component as well as possible.
- **Favorites List**: This will be implemented by **AsyncStorage**.

### Task 2: Detail Screen & Feedback - Assignment 2

On the **Detail screen**, you should display all the information about the handbag.

- **Feedback Area**: Jump to the area of feedback.
- The number of ratings is displayed in star form.
- The comments are clearly displayed.
- Ratings are grouped by value so users can quickly refer to them.

### Task 3: Favorite Functionality - Assignment 2

In this task, you will implement the **add to favorite list** function such that you support retrieve, create, and delete operations. The users can:

- **Add/Remove** a handbag to favoritelist from the **Home** and **Detail Screen** if the handbag does not already exist in the list of favorites.
- **Search** the handbags.
- **Show all** the handbags which were added to favorite list from the **FavoritesList** screen.

### Task 4: Advanced Features (Bonus) - Assignment 3

Developing and integrating Advanced Features into Your Expo App by yourself:

- Gemini AI
- Image Picker
- Map
- ...and others.

### Task 5: Optimization & UX - Assignment 3

- Each screen can be switched back and forth quickly.
- UI/UX design looks attractive and truly native.
- Side effects were adapted fully and reasonably for all screens.
