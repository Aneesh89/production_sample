/*
 *
 * Layout reducer
 *
 */
import produce from 'immer';
import {
  SET_ENABLE_BACKGROUND_IMAGE,
  SET_ENABLE_MOBILE_MENU,
  SET_ENABLE_MOBILE_MENU_SMALL,
  SET_ENABLE_FIXED_HEADER,
  SET_ENABLE_HEADER_SHADOW,
  SET_ENABLE_SIDEBAR_SHADOW,
  SET_ENABLE_FIXED_SIDEBAR,
  SET_ENABLE_CLOSED_SIDEBAR,
  SET_ENABLE_FIXED_FOOTER,
  SET_ENABLE_PAGETITLE_ICON,
  SET_ENABLE_PAGETITLE_SUBHEADING,
  SET_ENABLE_PAGE_TABS_ALT,
  SET_BACKGROUND_IMAGE,
  SET_BACKGROUND_COLOR,
  SET_COLOR_SCHEME,
  SET_BACKGROUND_IMAGE_OPACITY,
  SET_HEADER_BACKGROUND_COLOR
} from './constants';



export const initialState = {
 // backgroundColor: 'bg-midnight-bloom sidebar-text-light',
 // headerBackgroundColor: 'bg-primary header-text-light',
  backgroundColor: '',
  headerBackgroundColor: '',
  enableMobileMenuSmall: false,
  enableBackgroundImage: false,
  enableClosedSidebar: false,
  enableFixedHeader: true,
  enableHeaderShadow: true,
  enableSidebarShadow: true,
  enableFixedFooter: true,
  enableFixedSidebar: true,
  colorScheme: 'gray',
  backgroundImage: '',
  backgroundImageOpacity: 'opacity-06',
  enablePageTitleIcon: true,
  enablePageTitleSubheading: true,
  enablePageTabsAlt: true,
  menu:{
    loading:true,
    list:false,
    error:false
  }
};

/* eslint-disable default-case, no-param-reassign */
const layoutReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ENABLE_BACKGROUND_IMAGE:
        draft.enableBackgroundImage = action.enableBackgroundImage
        break;
      case SET_ENABLE_FIXED_HEADER:
        draft.enableFixedHeader = action.enableFixedHeader
        break;
      case SET_ENABLE_HEADER_SHADOW:
        draft.enableHeaderShadow = action.enableHeaderShadow
        break;
      case SET_ENABLE_SIDEBAR_SHADOW:
        draft.enableSidebarShadow = action.enableSidebarShadow
        break;
      case SET_ENABLE_PAGETITLE_ICON:
        draft.enablePageTitleIcon = action.enablePageTitleIcon
        break;
      case SET_ENABLE_PAGETITLE_SUBHEADING:
        draft.enablePageTitleSubheading = action.enablePageTitleSubheading
        break;
      case SET_ENABLE_PAGE_TABS_ALT:
        draft.enablePageTabsAlt = action.enablePageTabsAlt
        break;
      case SET_ENABLE_FIXED_SIDEBAR:
        draft.enableFixedSidebar = action.enableFixedSidebar
        break;
      case SET_ENABLE_MOBILE_MENU:
        draft.enableMobileMenu = action.enableMobileMenu
        break;
      case SET_ENABLE_MOBILE_MENU_SMALL:
        draft.enableMobileMenuSmall = action.enableMobileMenuSmall
        break;
      case SET_ENABLE_CLOSED_SIDEBAR:
        draft.enableClosedSidebar = action.enableClosedSidebar
        break;
      case SET_ENABLE_FIXED_FOOTER:
        draft.enableFixedFooter = action.enableFixedFooter
        break;
      case SET_BACKGROUND_COLOR:
        draft.backgroundColor = action.backgroundColor
        break;
      case SET_HEADER_BACKGROUND_COLOR:
        draft.headerBackgroundColor = action.headerBackgroundColor
        break;
      case SET_COLOR_SCHEME:
        draft.colorScheme = action.colorScheme
        break;
      case SET_BACKGROUND_IMAGE:
        draft.backgroundImage = action.backgroundImage
        break;
      case SET_BACKGROUND_IMAGE_OPACITY:
        draft.backgroundImageOpacity = action.backgroundImageOpacity
        break;
      

    }
  });

export default layoutReducer;
