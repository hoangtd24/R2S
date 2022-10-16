import { createSelector } from "@reduxjs/toolkit";

export const nameFilterChange = (state) => state.userFilter.names;
export const majorFilterChange = (state) => state.userFilter.majors;
export const changeFilterChange = (state) => state.userFilter.change
export const allUser = (state) => state.userFilter;

export const userCandidateRemainingSelector = createSelector(
  nameFilterChange,
  majorFilterChange,
  changeFilterChange,
  allUser,
  (names, majors, change, allUser) => {
    if (change) {
      let filter = allUser?.allUser?.filter(
          (item) =>
            item?.user?.firstName?.includes(names) ||
            item?.user?.lastName?.includes(names) ||
            (item?.user?.firstName + " " +item?.user?.lastName).includes(names)
        )
      if (majors) {
        return filter = filter?.filter((items) => items?.major?.name?.includes(majors));
      }
      return filter
    }
    return null
  }
);

