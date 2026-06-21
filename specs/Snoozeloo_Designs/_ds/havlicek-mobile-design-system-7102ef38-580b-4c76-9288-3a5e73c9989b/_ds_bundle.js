/* @ds-bundle: {"format":3,"namespace":"HavlicekMobileDesignSystem_7102ef","components":[],"sourceHashes":{"ui_kits/android/android-frame.jsx":"4e963c7b241a","ui_kits/android/app.jsx":"fa34fdcd2a42","ui_kits/android/components.jsx":"5418be0e5c0a","ui_kits/android/screens.jsx":"e31b14ce52d2","ui_kits/ios/app.jsx":"80bda2255243","ui_kits/ios/components.jsx":"985d8fbc4eb7","ui_kits/ios/ios-frame.jsx":"39f3a091d97d","ui_kits/ios/screens.jsx":"69504b11623d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HavlicekMobileDesignSystem_7102ef = window.HavlicekMobileDesignSystem_7102ef || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/android/android-frame.jsx
try { (() => {
/* BEGIN USAGE */
// Android.jsx — Simplified Android (Material 3) device frame
// Status bar + top app bar + content + gesture nav + keyboard.
// Based on Figma M3 spec. No dependencies, no image assets.
// Exports (to window): AndroidDevice, AndroidStatusBar, AndroidAppBar, AndroidListItem, AndroidNavBar, AndroidKeyboard
//
// Usage — wrap your screen content in <AndroidDevice> to get the bezel, status
// bar and gesture nav (props: title, large, keyboard, dark):
//
//   <AndroidDevice title="Inbox" large>
//     ...your screen content...
//   </AndroidDevice>
//   <AndroidDevice title="Compose" keyboard>…</AndroidDevice>
/* END USAGE */

const MD_C = {
  surface: '#f4fbf8',
  surfaceVariant: '#dae5e1',
  inverseOnSurface: '#ecf2ef',
  secondaryContainer: '#cde8e1',
  primaryFixedDim: '#83d5c6',
  onSurface: '#171d1b',
  onSurfaceVar: '#49454f',
  onPrimaryContainer: '#00201c',
  primary: '#006a60',
  frameBorder: 'rgba(116,119,117,0.5)'
};

// ─────────────────────────────────────────────────────────────
// Status bar (time left, wifi/cell/battery right)
// ─────────────────────────────────────────────────────────────
function AndroidStatusBar({
  dark = false
}) {
  const c = dark ? '#fff' : MD_C.onSurface;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 128,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 0.25,
      lineHeight: '20px',
      color: c
    }
  }, "9:30")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 8,
      transform: 'translateX(-50%)',
      width: 24,
      height: 24,
      borderRadius: 100,
      background: '#2e2e2e'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      paddingRight: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 13.3L.67 5.97a10.37 10.37 0 0114.66 0L8 13.3z",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.67 14.67V1.33L1.33 14.67h13.34z",
    fill: c
  }))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3.75",
    y: "2",
    width: "8.5",
    height: "13",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5.5",
    y: "0.9",
    width: "5",
    height: "2",
    rx: "0.5",
    fill: c
  }))));
}

// ─────────────────────────────────────────────────────────────
// Top app bar (Material 3 small/medium)
// ─────────────────────────────────────────────────────────────
function AndroidAppBar({
  title = 'Title',
  large = false
}) {
  const iconDot = /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: MD_C.onSurfaceVar,
      opacity: 0.3
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.surface,
      padding: '4px 4px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, iconDot, !large && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 22,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title), large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), iconDot), large && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 20px',
      fontSize: 28,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// List item (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidListItem({
  headline,
  supporting,
  leading
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 16px',
      minHeight: 56,
      boxSizing: 'border-box',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, leading && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: MD_C.primary,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 500,
      flexShrink: 0
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: MD_C.onSurface,
      lineHeight: '24px'
    }
  }, headline), supporting && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: MD_C.onSurfaceVar,
      lineHeight: '20px'
    }
  }, supporting)));
}

// ─────────────────────────────────────────────────────────────
// Gesture nav bar (pill)
// ─────────────────────────────────────────────────────────────
function AndroidNavBar({
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 108,
      height: 4,
      borderRadius: 2,
      background: dark ? '#fff' : MD_C.onSurface,
      opacity: 0.4
    }
  }));
}

// ─────────────────────────────────────────────────────────────
// Device frame — wraps everything
// ─────────────────────────────────────────────────────────────
function AndroidDevice({
  children,
  width = 412,
  height = 892,
  dark = false,
  title,
  large = false,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 18,
      overflow: 'hidden',
      background: dark ? '#1d1b20' : MD_C.surface,
      border: `8px solid ${MD_C.frameBorder}`,
      boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(AndroidStatusBar, {
    dark: dark
  }), title !== undefined && /*#__PURE__*/React.createElement(AndroidAppBar, {
    title: title,
    large: large
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(AndroidKeyboard, null), /*#__PURE__*/React.createElement(AndroidNavBar, {
    dark: dark
  }));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — Gboard (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidKeyboard() {
  let _k = 0;
  const key = (l, {
    flex = 1,
    bg = MD_C.surface,
    r = 6,
    minW,
    fs = 21
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: _k++,
    style: {
      height: 46,
      borderRadius: r,
      flex,
      minWidth: minW,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto, system-ui',
      fontSize: fs,
      color: MD_C.onPrimaryContainer
    }
  }, l);
  const row = (keys, style = {}) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      ...style
    }
  }, keys.map(l => key(l)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.inverseOnSurface,
      padding: '0 8px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], {
    padding: '0 20px'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('', {
    bg: MD_C.surfaceVariant
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 7,
      minWidth: 274
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l))), key('', {
    bg: MD_C.surfaceVariant
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('?123', {
    bg: MD_C.secondaryContainer,
    r: 100,
    minW: 58,
    fs: 14
  }), key(',', {
    bg: MD_C.surfaceVariant
  }), key('', {
    flex: 3,
    minW: 154
  }), key('.', {
    bg: MD_C.surfaceVariant
  }), key('', {
    bg: MD_C.primaryFixedDim,
    r: 100,
    minW: 58
  }))));
}
Object.assign(window, {
  AndroidDevice,
  AndroidStatusBar,
  AndroidAppBar,
  AndroidListItem,
  AndroidNavBar,
  AndroidKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/android/android-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/android/app.jsx
try { (() => {
/* Root Android app — interactive Material 3 prototype. */

const SAMPLE_TASKS_A = [{
  id: 't1',
  title: 'Morning workout',
  group: 'Morning',
  time: '7:30 AM',
  tag: {
    label: 'Personal'
  },
  done: true,
  priority: 'High',
  notes: 'Easy 30-min run, focus on form. Stretch after.',
  subtasks: [{
    title: 'Warm up',
    done: true
  }, {
    title: 'Run 5km',
    done: true
  }, {
    title: 'Stretch',
    done: false
  }]
}, {
  id: 't2',
  title: 'Review design system tokens',
  group: 'Morning',
  time: '9:00 AM',
  tag: {
    label: 'Work'
  },
  done: false,
  priority: 'High',
  notes: 'Walk through the new color + type scale with the team. Get sign-off on the green accent.',
  subtasks: [{
    title: 'Prep slides',
    done: true
  }, {
    title: 'Send agenda',
    done: false
  }, {
    title: 'Record meeting',
    done: false
  }]
}, {
  id: 't3',
  title: 'Standup with mobile team',
  group: 'Morning',
  time: '10:00 AM',
  tag: {
    label: 'Work'
  },
  done: false,
  priority: 'Medium'
}, {
  id: 't4',
  title: 'Pair on Material 3 animations',
  group: 'Afternoon',
  time: '2:00 PM',
  tag: {
    label: 'Focus'
  },
  done: false,
  priority: 'High'
}, {
  id: 't5',
  title: 'Reply to investor email',
  group: 'Afternoon',
  tag: {
    label: 'Admin'
  },
  done: false,
  priority: 'Low'
}, {
  id: 't6',
  title: 'Read "Refactoring UI" ch. 3',
  group: 'Anytime',
  tag: {
    label: 'Personal'
  },
  done: false,
  priority: 'Low'
}, {
  id: 't7',
  title: 'Plan weekend trip',
  group: 'Anytime',
  done: false,
  priority: 'Low'
}];
const M_TABS = [{
  id: 'home',
  label: 'Home',
  icon: 'home',
  activeIcon: 'homeFill'
}, {
  id: 'explore',
  label: 'Explore',
  icon: 'explore'
}, {
  id: 'inbox',
  label: 'Inbox',
  icon: 'bell'
}, {
  id: 'profile',
  label: 'You',
  icon: 'user'
}];
function MExploreScreen({
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll screen-content",
    style: {
      height: '100%',
      background: 'var(--m3-surface)'
    }
  }, /*#__PURE__*/React.createElement(M3AppBar, {
    title: "Explore",
    large: true,
    leading: {
      icon: 'menu'
    },
    trailing: {
      icon: 'search'
    },
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m3-card elevated",
    style: {
      marginBottom: 16,
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      background: 'var(--m3-primary-container)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 24,
      background: 'var(--m3-primary)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "star",
    size: 22,
    color: "#FFF",
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--m3-on-primary-cont)'
    }
  }, "Try focus mode"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--m3-on-primary-cont)',
      opacity: 0.7,
      marginTop: 2
    }
  }, "Block distractions while you work.")), /*#__PURE__*/React.createElement("button", {
    className: "m3-btn filled",
    style: {
      height: 32,
      padding: '0 16px',
      fontSize: 13
    }
  }, "Start")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--m3-on-surface-var)',
      padding: '4px 4px 12px'
    }
  }, "Templates"), /*#__PURE__*/React.createElement("div", {
    className: "m3-card",
    style: {
      padding: 0,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "calendar",
    headline: "Weekly planning",
    supporting: "A repeating template for Mondays"
  }), /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "flag",
    headline: "Project kickoff",
    supporting: "Goals, milestones, owners"
  }), /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "star",
    headline: "Habit tracker",
    supporting: "Track 5 daily habits",
    divider: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--m3-on-surface-var)',
      padding: '4px 4px 12px'
    }
  }, "Stats"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m3-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--m3-on-surface-var)',
      marginBottom: 4
    }
  }, "This week"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: 'var(--m3-on-surface)',
      letterSpacing: '-0.02em'
    }
  }, "27"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--m3-primary)',
      marginTop: 2
    }
  }, "+12% vs last week")), /*#__PURE__*/React.createElement("div", {
    className: "m3-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--m3-on-surface-var)',
      marginBottom: 4
    }
  }, "Streak"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: 'var(--m3-on-surface)',
      letterSpacing: '-0.02em'
    }
  }, "14 days"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--m3-on-surface-var)',
      marginTop: 2
    }
  }, "Best so far")))));
}
function MApp() {
  const [signedIn, setSignedIn] = React.useState(true);
  const [tab, setTab] = React.useState('home');
  const [dark, setDark] = React.useState(false);
  const [tasks, setTasks] = React.useState(SAMPLE_TASKS_A);
  const [openTaskId, setOpenTaskId] = React.useState(null);
  const [adding, setAdding] = React.useState(false);
  const toggleTask = id => setTasks(ts => ts.map(t => t.id === id ? {
    ...t,
    done: !t.done
  } : t));
  const addTask = title => {
    setTasks(ts => [...ts, {
      id: 't' + Date.now(),
      title,
      group: 'Anytime',
      done: false,
      priority: 'Medium'
    }]);
    setAdding(false);
  };
  const openTask = tasks.find(t => t.id === openTaskId);
  let content;
  if (!signedIn) {
    content = /*#__PURE__*/React.createElement(MSignInScreen, {
      onSignIn: () => setSignedIn(true),
      dark: dark
    });
  } else if (openTask) {
    content = /*#__PURE__*/React.createElement(MTaskDetailScreen, {
      task: openTask,
      onBack: () => setOpenTaskId(null),
      onToggle: toggleTask,
      dark: dark
    });
  } else if (tab === 'home') {
    content = /*#__PURE__*/React.createElement(MHomeScreen, {
      tasks: tasks,
      onToggle: toggleTask,
      onOpenTask: setOpenTaskId,
      onAdd: () => setAdding(true),
      dark: dark
    });
  } else if (tab === 'explore') {
    content = /*#__PURE__*/React.createElement(MExploreScreen, {
      dark: dark
    });
  } else if (tab === 'inbox') {
    content = /*#__PURE__*/React.createElement(MInboxScreen, {
      dark: dark
    });
  } else if (tab === 'profile') {
    content = /*#__PURE__*/React.createElement(MProfileScreen, {
      dark: dark,
      onToggleDark: setDark
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "stage",
    "data-theme": dark ? 'dark' : 'light'
  }, /*#__PURE__*/React.createElement(AndroidDevice, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      background: 'var(--m3-surface)'
    }
  }, content, signedIn && !openTask && /*#__PURE__*/React.createElement(M3BottomNav, {
    tabs: M_TABS,
    value: tab,
    onChange: setTab
  }), adding && /*#__PURE__*/React.createElement(MAddTaskSheet, {
    onClose: () => setAdding(false),
    onAdd: addTask,
    dark: dark
  }))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(MApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/android/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/android/components.jsx
try { (() => {
/* Android UI kit components (Material 3 brand'd) */

const MIcon = ({
  name,
  size = 24,
  color = 'currentColor',
  fill = 'none',
  strokeWidth = 1.75
}) => {
  const paths = {
    home: /*#__PURE__*/React.createElement("path", {
      d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"
    }),
    homeFill: /*#__PURE__*/React.createElement("g", {
      fill: color,
      stroke: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 12 12 3l9 9v8a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"
    })),
    explore: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76",
      fill: color
    })),
    bell: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
    })),
    user: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "7",
      r: "4"
    })),
    search: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3"
    })),
    plus: /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14M12 5v14"
    }),
    menu: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "12",
      x2: "21",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "6",
      x2: "21",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "18",
      x2: "21",
      y2: "18"
    })),
    more: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "6",
      r: "1.4",
      fill: color
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "1.4",
      fill: color
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "18",
      r: "1.4",
      fill: color
    })),
    check: /*#__PURE__*/React.createElement("polyline", {
      points: "20 6 9 17 4 12",
      strokeWidth: "2.5"
    }),
    arrowLeft: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: "19",
      y1: "12",
      x2: "5",
      y2: "12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 19 5 12 12 5"
    })),
    calendar: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "2",
      x2: "16",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "8",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "10",
      x2: "21",
      y2: "10"
    })),
    flag: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "22",
      x2: "4",
      y2: "15"
    })),
    moon: /*#__PURE__*/React.createElement("path", {
      d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
    }),
    lock: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "11",
      width: "18",
      height: "11",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 11V7a5 5 0 0 1 10 0v4"
    })),
    bell2: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13.73 21a2 2 0 0 1-3.46 0"
    })),
    creditCard: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "5",
      width: "20",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "2",
      y1: "10",
      x2: "22",
      y2: "10"
    })),
    logout: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "16 17 21 12 16 7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "12",
      x2: "9",
      y2: "12"
    })),
    clock: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 6 12 12 16 14"
    })),
    star: /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    }),
    chevronRight: /*#__PURE__*/React.createElement("polyline", {
      points: "9 18 15 12 9 6"
    }),
    settings: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, paths[name]);
};

/* ---------- M3 Top app bar (small + large variants, brand-cleaned) ---------- */
const M3AppBar = ({
  title,
  large = false,
  leading,
  trailing,
  dark
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--m3-surface)',
      padding: '4px 4px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      display: 'grid',
      placeItems: 'center',
      cursor: leading?.onClick ? 'pointer' : 'default'
    },
    onClick: leading?.onClick
  }, leading?.icon ? /*#__PURE__*/React.createElement(MIcon, {
    name: leading.icon,
    size: 24,
    color: "var(--m3-on-surface)",
    strokeWidth: 2
  }) : null), !large && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 22,
      fontWeight: 500,
      color: 'var(--m3-on-surface)'
    }
  }, title), large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      display: 'grid',
      placeItems: 'center',
      cursor: trailing?.onClick ? 'pointer' : 'default'
    },
    onClick: trailing?.onClick
  }, trailing?.icon ? /*#__PURE__*/React.createElement(MIcon, {
    name: trailing.icon,
    size: 24,
    color: "var(--m3-on-surface)",
    strokeWidth: 2
  }) : trailing?.node)), large && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 20px',
      fontSize: 28,
      fontWeight: 500,
      color: 'var(--m3-on-surface)',
      letterSpacing: '-0.01em',
      lineHeight: 1.2
    }
  }, title));
};

/* ---------- M3 Bottom nav (4-tab) ---------- */
const M3BottomNav = ({
  tabs,
  value,
  onChange
}) => /*#__PURE__*/React.createElement("div", {
  className: "m3-nav",
  style: {
    '--cols': tabs.length
  }
}, tabs.map(t => /*#__PURE__*/React.createElement("div", {
  key: t.id,
  className: `item ${value === t.id ? 'active' : ''}`,
  onClick: () => onChange(t.id)
}, /*#__PURE__*/React.createElement("div", {
  className: "indicator"
}, /*#__PURE__*/React.createElement(MIcon, {
  name: value === t.id && t.activeIcon ? t.activeIcon : t.icon,
  size: 22,
  color: "currentColor",
  strokeWidth: value === t.id ? 0 : 1.8,
  fill: value === t.id ? 'currentColor' : 'none'
})), /*#__PURE__*/React.createElement("span", null, t.label))));

/* ---------- M3 FAB ---------- */
const M3FAB = ({
  onClick,
  icon = 'plus',
  label,
  primary = false
}) => /*#__PURE__*/React.createElement("button", {
  className: `m3-fab ${label ? 'extended' : ''} ${primary ? 'primary' : ''}`,
  onClick: onClick
}, /*#__PURE__*/React.createElement(MIcon, {
  name: icon,
  size: 22,
  color: "currentColor",
  strokeWidth: 2
}), label && /*#__PURE__*/React.createElement("span", null, label));

/* ---------- M3 List item ---------- */
const M3ListItem = ({
  leading,
  headline,
  supporting,
  trailing,
  onClick,
  divider = true
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClick,
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '12px 16px',
    minHeight: 56,
    cursor: onClick ? 'pointer' : 'default',
    borderBottom: divider ? '1px solid var(--m3-outline-variant)' : 'none'
  }
}, leading && /*#__PURE__*/React.createElement("div", {
  style: {
    width: 40,
    height: 40,
    borderRadius: 20,
    background: 'var(--m3-primary-container)',
    color: 'var(--m3-on-primary-cont)',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
    fontWeight: 600,
    fontSize: 14
  }
}, typeof leading === 'string' ? /*#__PURE__*/React.createElement(MIcon, {
  name: leading,
  size: 20,
  color: "currentColor",
  strokeWidth: 2
}) : leading), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 16,
    color: 'var(--m3-on-surface)',
    lineHeight: 1.4
  }
}, headline), supporting && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 14,
    color: 'var(--m3-on-surface-var)',
    lineHeight: 1.4,
    marginTop: 2
  }
}, supporting)), trailing);

/* ---------- M3 Avatar ---------- */
const M3Avatar = ({
  initials,
  size = 40,
  tone
}) => {
  const palettes = {
    green: {
      bg: '#ECFDF3',
      fg: '#027A48'
    },
    amber: {
      bg: '#FFFBEB',
      fg: '#B45309'
    },
    blue: {
      bg: '#EFF6FF',
      fg: '#1D4ED8'
    },
    pink: {
      bg: '#FDF2F8',
      fg: '#9D174D'
    },
    purple: {
      bg: '#F5F3FF',
      fg: '#5B21B6'
    }
  };
  const t = palettes[tone] || palettes.green;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: t.bg,
      color: t.fg,
      display: 'grid',
      placeItems: 'center',
      fontWeight: 600,
      fontSize: Math.round(size * 0.36),
      flexShrink: 0
    }
  }, initials);
};

/* ---------- M3 Switch ---------- */
const M3Switch = ({
  on,
  onChange
}) => /*#__PURE__*/React.createElement("button", {
  onClick: () => onChange && onChange(!on),
  style: {
    width: 52,
    height: 32,
    borderRadius: 16,
    background: on ? 'var(--m3-primary)' : 'transparent',
    border: on ? 0 : '2px solid var(--m3-outline)',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 200ms'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    top: on ? 4 : 8,
    left: on ? 24 : 8,
    width: on ? 24 : 16,
    height: on ? 24 : 16,
    borderRadius: '50%',
    background: on ? '#FFFFFF' : 'var(--m3-outline)',
    transition: 'all 200ms cubic-bezier(.34, 1.42, .5, 1)',
    display: 'grid',
    placeItems: 'center',
    color: 'var(--m3-primary)'
  }
}, on && /*#__PURE__*/React.createElement(MIcon, {
  name: "check",
  size: 14,
  color: "currentColor",
  strokeWidth: 3
})));

/* ---------- M3 Checkbox (round, brand) ---------- */
const M3Checkbox = ({
  checked,
  onChange
}) => /*#__PURE__*/React.createElement("button", {
  onClick: () => onChange && onChange(!checked),
  style: {
    width: 22,
    height: 22,
    borderRadius: 4,
    border: '2px solid ' + (checked ? 'var(--m3-primary)' : 'var(--m3-outline)'),
    background: checked ? 'var(--m3-primary)' : 'transparent',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 120ms'
  }
}, checked && /*#__PURE__*/React.createElement(MIcon, {
  name: "check",
  size: 12,
  color: "#FFF",
  strokeWidth: 3.5
}));

/* ---------- M3 Chip ---------- */
const M3Chip = ({
  selected,
  onClick,
  children,
  icon
}) => /*#__PURE__*/React.createElement("button", {
  className: `m3-chip ${selected ? 'selected' : ''}`,
  onClick: onClick
}, icon && /*#__PURE__*/React.createElement(MIcon, {
  name: icon,
  size: 16,
  color: "currentColor",
  strokeWidth: 2
}), children);
Object.assign(window, {
  MIcon,
  M3AppBar,
  M3BottomNav,
  M3FAB,
  M3ListItem,
  M3Avatar,
  M3Switch,
  M3Checkbox,
  M3Chip
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/android/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/android/screens.jsx
try { (() => {
/* Android screens — same Stride task app, Material 3 conventions. */

function MSignInScreen({
  onSignIn,
  dark
}) {
  const [email, setEmail] = React.useState('tomas@havlicek.dev');
  const [pwd, setPwd] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      background: 'var(--m3-surface)',
      display: 'flex',
      flexDirection: 'column',
      padding: '80px 24px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 18,
      background: 'var(--m3-primary)',
      display: 'grid',
      placeItems: 'center',
      marginBottom: 24,
      boxShadow: '0 8px 20px rgba(18,183,106,0.28)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#FFF',
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '-0.04em'
    }
  }, "S")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 32,
      fontWeight: 500,
      color: 'var(--m3-on-surface)',
      marginBottom: 8,
      letterSpacing: '-0.005em',
      lineHeight: 1.15
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: 'var(--m3-on-surface-var)',
      lineHeight: 1.5
    }
  }, "Sign in to pick up where you left off.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(FloatField, {
    label: "Email",
    value: email,
    onChange: setEmail
  }), /*#__PURE__*/React.createElement(FloatField, {
    label: "Password",
    value: pwd,
    onChange: setPwd,
    type: "password"
  })), /*#__PURE__*/React.createElement("button", {
    className: "m3-btn filled lg full",
    onClick: onSignIn
  }, "Sign in"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "m3-btn text"
  }, "Forgot password?")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: 14,
      color: 'var(--m3-on-surface-var)'
    }
  }, "New here? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--m3-primary)',
      fontWeight: 600
    }
  }, "Create an account")));
}
function FloatField({
  label,
  value,
  onChange,
  type = 'text'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `m3-field ${value ? 'filled' : ''}`
  }, /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: type,
    value: value,
    onChange: e => onChange(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    className: "label"
  }, label));
}

/* ──────────────── HOME ──────────────── */
function MHomeScreen({
  tasks,
  onToggle,
  onOpenTask,
  onAdd,
  dark
}) {
  const grouped = {
    Morning: tasks.filter(t => t.group === 'Morning'),
    Afternoon: tasks.filter(t => t.group === 'Afternoon'),
    Anytime: tasks.filter(t => t.group === 'Anytime')
  };
  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pct = total ? Math.round(done / total * 100) : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll screen-content",
    style: {
      height: '100%',
      position: 'relative',
      background: 'var(--m3-surface)'
    }
  }, /*#__PURE__*/React.createElement(M3AppBar, {
    title: "Today",
    large: true,
    leading: {
      icon: 'menu'
    },
    trailing: {
      node: /*#__PURE__*/React.createElement(M3Avatar, {
        initials: "TH",
        size: 32,
        tone: "green"
      })
    },
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m3-card",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 56,
      height: 56
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 36 36",
    style: {
      transform: 'rotate(-90deg)'
    },
    width: "56",
    height: "56"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "18",
    r: "15.9",
    fill: "none",
    stroke: "var(--m3-outline-variant)",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "18",
    r: "15.9",
    fill: "none",
    stroke: "var(--m3-primary)",
    strokeWidth: "3",
    strokeDasharray: `${pct} 100`,
    strokeLinecap: "round",
    pathLength: "100"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--m3-on-surface)'
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--m3-on-surface)',
      marginBottom: 2
    }
  }, done, " of ", total, " done"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--m3-on-surface-var)'
    }
  }, total - done > 0 ? `${total - done} task${total - done === 1 ? '' : 's'} left for today` : "You're all caught up.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '12px 16px 4px',
      flexWrap: 'nowrap',
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement(M3Chip, {
    selected: true
  }, "All"), /*#__PURE__*/React.createElement(M3Chip, {
    icon: "flag"
  }, "Priority"), /*#__PURE__*/React.createElement(M3Chip, {
    icon: "calendar"
  }, "Today"), /*#__PURE__*/React.createElement(M3Chip, {
    icon: "star"
  }, "Starred")), Object.entries(grouped).map(([group, items]) => items.length > 0 && /*#__PURE__*/React.createElement("div", {
    key: group,
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 4px',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--m3-on-surface-var)',
      letterSpacing: '0.02em'
    }
  }, group), /*#__PURE__*/React.createElement("div", null, items.map((t, i) => /*#__PURE__*/React.createElement(MTaskRow, {
    key: t.id,
    task: t,
    onToggle: onToggle,
    onOpen: () => onOpenTask(t.id),
    last: i === items.length - 1
  }))))), /*#__PURE__*/React.createElement(M3FAB, {
    onClick: onAdd,
    icon: "plus",
    label: "New task",
    primary: true
  }));
}
function MTaskRow({
  task,
  onToggle,
  onOpen,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 16px',
      minHeight: 56,
      borderBottom: last ? 'none' : '1px solid var(--m3-outline-variant)'
    }
  }, /*#__PURE__*/React.createElement(M3Checkbox, {
    checked: task.done,
    onChange: () => onToggle(task.id)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: onOpen,
    style: {
      flex: 1,
      minWidth: 0,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: 'var(--m3-on-surface)',
      textDecoration: task.done ? 'line-through' : 'none',
      opacity: task.done ? 0.5 : 1,
      marginBottom: task.time || task.tag ? 3 : 0
    }
  }, task.title), (task.time || task.tag) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, task.time && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--m3-on-surface-var)',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "clock",
    size: 12,
    color: "currentColor"
  }), /*#__PURE__*/React.createElement("span", null, task.time)), task.tag && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      padding: '2px 8px',
      borderRadius: 6,
      background: 'var(--m3-surface-cont-high)',
      color: 'var(--m3-on-surface-var)'
    }
  }, task.tag.label))));
}

/* ──────────────── TASK DETAIL ──────────────── */
function MTaskDetailScreen({
  task,
  onBack,
  onToggle,
  dark
}) {
  if (!task) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll screen-content",
    style: {
      height: '100%',
      background: 'var(--m3-surface)'
    }
  }, /*#__PURE__*/React.createElement(M3AppBar, {
    title: "Task",
    leading: {
      icon: 'arrowLeft',
      onClick: onBack
    },
    trailing: {
      icon: 'more'
    },
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginBottom: 24,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(M3Checkbox, {
    checked: task.done,
    onChange: () => onToggle(task.id)
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      flex: 1,
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: 'var(--m3-on-surface)',
      lineHeight: 1.25,
      textDecoration: task.done ? 'line-through' : 'none',
      opacity: task.done ? 0.5 : 1
    }
  }, task.title)), /*#__PURE__*/React.createElement("div", {
    className: "m3-card",
    style: {
      marginBottom: 16,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "calendar",
    headline: "Today",
    supporting: task.time || 'No time set',
    divider: true
  }), /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "flag",
    headline: "Priority",
    supporting: task.priority || 'Medium',
    divider: true
  }), /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "clock",
    headline: "Repeat",
    supporting: "None",
    divider: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--m3-on-surface-var)',
      padding: '4px 4px 10px'
    }
  }, "Subtasks"), /*#__PURE__*/React.createElement("div", {
    className: "m3-card",
    style: {
      marginBottom: 16,
      padding: 0
    }
  }, (task.subtasks || []).map((s, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      borderBottom: i < arr.length - 1 ? '1px solid var(--m3-outline-variant)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(M3Checkbox, {
    checked: s.done,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 15,
      color: 'var(--m3-on-surface)',
      opacity: s.done ? 0.5 : 1,
      textDecoration: s.done ? 'line-through' : 'none'
    }
  }, s.title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--m3-on-surface-var)',
      padding: '4px 4px 10px'
    }
  }, "Notes"), /*#__PURE__*/React.createElement("div", {
    className: "m3-card",
    style: {
      fontSize: 15,
      color: 'var(--m3-on-surface)',
      lineHeight: 1.5
    }
  }, task.notes || 'Tap to add notes…')));
}

/* ──────────────── INBOX ──────────────── */
function MInboxScreen({
  dark
}) {
  const items = [{
    id: 1,
    name: 'Jamie Donoghue',
    text: 'assigned you to "Q3 planning doc"',
    time: '4m',
    tone: 'green',
    unread: true
  }, {
    id: 2,
    name: 'Sam Park',
    text: 'commented on "Onboarding redesign"',
    time: '1h',
    tone: 'amber',
    unread: true
  }, {
    id: 3,
    name: 'Riya Anand',
    text: 'approved your time off request',
    time: '3h',
    tone: 'blue',
    unread: false
  }, {
    id: 4,
    name: 'Marcus Lee',
    text: 'shared "Roadmap v2" with you',
    time: 'Yesterday',
    tone: 'purple',
    unread: false
  }, {
    id: 5,
    name: 'Eva Bauer',
    text: 'mentioned you in "Design crit notes"',
    time: 'Mon',
    tone: 'pink',
    unread: false
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll screen-content",
    style: {
      height: '100%',
      background: 'var(--m3-surface)'
    }
  }, /*#__PURE__*/React.createElement(M3AppBar, {
    title: "Inbox",
    large: true,
    leading: {
      icon: 'menu'
    },
    trailing: {
      icon: 'search'
    },
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m3-card",
    style: {
      padding: 0
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '14px 16px',
      gap: 14,
      position: 'relative',
      borderBottom: i < items.length - 1 ? '1px solid var(--m3-outline-variant)' : 'none'
    }
  }, it.unread && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 4,
      top: 26,
      width: 6,
      height: 6,
      borderRadius: 3,
      background: 'var(--m3-primary)'
    }
  }), /*#__PURE__*/React.createElement(M3Avatar, {
    initials: it.name.split(' ').map(n => n[0]).join(''),
    tone: it.tone
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--m3-on-surface)',
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, it.name), " ", it.text), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--m3-on-surface-var)',
      marginTop: 3
    }
  }, it.time)))))));
}

/* ──────────────── PROFILE ──────────────── */
function MProfileScreen({
  dark,
  onToggleDark
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll screen-content",
    style: {
      height: '100%',
      background: 'var(--m3-surface)'
    }
  }, /*#__PURE__*/React.createElement(M3AppBar, {
    title: "Profile",
    large: true,
    leading: {
      icon: 'menu'
    },
    trailing: {
      icon: 'settings'
    },
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m3-card",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(M3Avatar, {
    initials: "TH",
    size: 56,
    tone: "green"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--m3-on-surface)'
    }
  }, "Tomas Havlicek"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--m3-on-surface-var)',
      marginTop: 2
    }
  }, "tomas@havlicek.dev"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--m3-primary)',
      padding: '12px 4px 8px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "Account"), /*#__PURE__*/React.createElement("div", {
    className: "m3-card",
    style: {
      padding: 0,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "bell2",
    headline: "Notifications",
    supporting: "Push, in-app, email",
    trailing: /*#__PURE__*/React.createElement(MIcon, {
      name: "chevronRight",
      size: 20,
      color: "var(--m3-on-surface-var)",
      strokeWidth: 2
    })
  }), /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "moon",
    headline: "Dark mode",
    supporting: dark ? 'On' : 'Off',
    trailing: /*#__PURE__*/React.createElement(M3Switch, {
      on: dark,
      onChange: onToggleDark
    }),
    divider: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--m3-primary)',
      padding: '12px 4px 8px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "Subscription"), /*#__PURE__*/React.createElement("div", {
    className: "m3-card",
    style: {
      padding: 0,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "star",
    headline: "Stride Pro",
    supporting: "Trial \xB7 3 days left",
    trailing: /*#__PURE__*/React.createElement(MIcon, {
      name: "chevronRight",
      size: 20,
      color: "var(--m3-on-surface-var)",
      strokeWidth: 2
    })
  }), /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "creditCard",
    headline: "Billing",
    supporting: "Add a payment method",
    trailing: /*#__PURE__*/React.createElement(MIcon, {
      name: "chevronRight",
      size: 20,
      color: "var(--m3-on-surface-var)",
      strokeWidth: 2
    }),
    divider: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--m3-primary)',
      padding: '12px 4px 8px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "Security"), /*#__PURE__*/React.createElement("div", {
    className: "m3-card",
    style: {
      padding: 0,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(M3ListItem, {
    leading: "lock",
    headline: "Privacy & security",
    supporting: "Manage your data",
    trailing: /*#__PURE__*/React.createElement(MIcon, {
      name: "chevronRight",
      size: 20,
      color: "var(--m3-on-surface-var)",
      strokeWidth: 2
    }),
    divider: false
  })), /*#__PURE__*/React.createElement("button", {
    className: "m3-btn outlined full"
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "logout",
    size: 18,
    color: "currentColor",
    strokeWidth: 2
  }), "Sign out")));
}

/* ──────────────── ADD TASK SHEET ──────────────── */
function MAddTaskSheet({
  onClose,
  onAdd,
  dark
}) {
  const [title, setTitle] = React.useState('');
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current && ref.current.focus();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.45)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--m3-surface-cont)',
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: '8px 0 32px',
      boxShadow: '0 -8px 32px rgba(0,0,0,0.15)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 4,
      borderRadius: 2,
      background: 'var(--m3-outline)',
      opacity: 0.6,
      margin: '0 auto 16px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 24px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 500,
      color: 'var(--m3-on-surface)',
      marginBottom: 16
    }
  }, "New task"), /*#__PURE__*/React.createElement("input", {
    ref: ref,
    placeholder: "What needs to be done?",
    value: title,
    onChange: e => setTitle(e.target.value),
    style: {
      width: '100%',
      height: 56,
      padding: '0 16px',
      borderRadius: 12,
      border: '1px solid var(--m3-outline-variant)',
      background: 'var(--m3-surface)',
      fontFamily: 'inherit',
      fontSize: 16,
      color: 'var(--m3-on-surface)',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(M3Chip, {
    icon: "calendar"
  }, "Today"), /*#__PURE__*/React.createElement(M3Chip, {
    icon: "clock"
  }, "Time"), /*#__PURE__*/React.createElement(M3Chip, {
    icon: "flag"
  }, "Priority")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 24,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "m3-btn text",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "m3-btn filled",
    onClick: () => title.trim() && onAdd(title.trim())
  }, "Add task")))));
}
Object.assign(window, {
  MSignInScreen,
  MHomeScreen,
  MTaskDetailScreen,
  MInboxScreen,
  MProfileScreen,
  MAddTaskSheet,
  FloatField
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/android/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios/app.jsx
try { (() => {
/* Root app — interactive iOS prototype. Loaded last. */

const SAMPLE_TASKS = [{
  id: 't1',
  title: 'Morning workout',
  group: 'Morning',
  time: '7:30 AM',
  tag: {
    tone: 'green',
    label: 'Personal'
  },
  done: true,
  priority: 'High',
  notes: 'Easy 30-min run, focus on form. Stretch after.',
  subtasks: [{
    title: 'Warm up',
    done: true
  }, {
    title: 'Run 5km',
    done: true
  }, {
    title: 'Stretch',
    done: false
  }]
}, {
  id: 't2',
  title: 'Review design system tokens',
  group: 'Morning',
  time: '9:00 AM',
  tag: {
    tone: 'blue',
    label: 'Work'
  },
  done: false,
  priority: 'High',
  notes: 'Walk through the new color + type scale with the team. Get sign-off on the green accent.',
  subtasks: [{
    title: 'Prep slides',
    done: true
  }, {
    title: 'Send agenda',
    done: false
  }, {
    title: 'Record meeting',
    done: false
  }]
}, {
  id: 't3',
  title: 'Standup with mobile team',
  group: 'Morning',
  time: '10:00 AM',
  tag: {
    tone: 'blue',
    label: 'Work'
  },
  done: false,
  priority: 'Medium'
}, {
  id: 't4',
  title: 'Pair on iOS animations',
  group: 'Afternoon',
  time: '2:00 PM',
  tag: {
    tone: 'amber',
    label: 'Focus'
  },
  done: false,
  priority: 'High'
}, {
  id: 't5',
  title: 'Reply to investor email',
  group: 'Afternoon',
  tag: {
    tone: 'gray',
    label: 'Admin'
  },
  done: false,
  priority: 'Low'
}, {
  id: 't6',
  title: 'Read "Refactoring UI" ch. 3',
  group: 'Anytime',
  tag: {
    tone: 'green',
    label: 'Personal'
  },
  done: false,
  priority: 'Low'
}, {
  id: 't7',
  title: 'Plan weekend trip',
  group: 'Anytime',
  done: false,
  priority: 'Low'
}];
const TABS = [{
  id: 'home',
  label: 'Today',
  icon: 'home',
  activeIcon: 'homeFill'
}, {
  id: 'search',
  label: 'Search',
  icon: 'search'
}, {
  id: 'inbox',
  label: 'Inbox',
  icon: 'bell'
}, {
  id: 'profile',
  label: 'Profile',
  icon: 'user'
}];
function SearchScreen({
  dark
}) {
  const fg = dark ? '#FAFAFA' : '#09090B';
  const muted = dark ? '#A1A1AA' : '#71717A';
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll screen-content",
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    title: "Search",
    large: true,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: dark ? '#1C1C1E' : '#FFFFFF',
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 14px',
      height: 44
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18,
    color: muted
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Tasks, people, projects",
    style: {
      flex: 1,
      border: 0,
      outline: 0,
      background: 'transparent',
      fontFamily: 'inherit',
      fontSize: 16,
      color: fg
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px 8px',
      fontSize: 13,
      fontWeight: 600,
      color: muted,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, "Recent"), /*#__PURE__*/React.createElement(ListGroup, {
    dark: dark
  }, [{
    ic: 'clock',
    t: 'Q3 planning doc'
  }, {
    ic: 'clock',
    t: 'Onboarding redesign'
  }, {
    ic: 'clock',
    t: 'Tomas Havlicek'
  }].map((r, i, arr) => /*#__PURE__*/React.createElement(ListRow, {
    key: i,
    icon: r.ic,
    iconBg: "#A1A1AA",
    title: r.t,
    chevron: true,
    isLast: i === arr.length - 1,
    dark: dark
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 24px 8px',
      fontSize: 13,
      fontWeight: 600,
      color: muted,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, "Suggestions"), /*#__PURE__*/React.createElement(ListGroup, {
    dark: dark
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "star",
    iconBg: "#F59E0B",
    title: "Tasks due today",
    detail: "3",
    chevron: true,
    dark: dark
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "paperclip",
    iconBg: "#3B82F6",
    title: "Files shared with me",
    detail: "12",
    chevron: true,
    dark: dark
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "inbox",
    iconBg: "#12B76A",
    title: "Mentions",
    detail: "5",
    chevron: true,
    isLast: true,
    dark: dark
  })));
}
function App() {
  const [signedIn, setSignedIn] = React.useState(true);
  const [tab, setTab] = React.useState('home');
  const [dark, setDark] = React.useState(false);
  const [tasks, setTasks] = React.useState(SAMPLE_TASKS);
  const [openTaskId, setOpenTaskId] = React.useState(null);
  const [adding, setAdding] = React.useState(false);
  const toggleTask = id => setTasks(ts => ts.map(t => t.id === id ? {
    ...t,
    done: !t.done
  } : t));
  const addTask = title => {
    setTasks(ts => [...ts, {
      id: 't' + Date.now(),
      title,
      group: 'Anytime',
      done: false,
      priority: 'Medium'
    }]);
    setAdding(false);
  };
  const openTask = tasks.find(t => t.id === openTaskId);
  let content;
  if (!signedIn) {
    content = /*#__PURE__*/React.createElement(SignInScreen, {
      onSignIn: () => setSignedIn(true),
      dark: dark
    });
  } else if (openTask) {
    content = /*#__PURE__*/React.createElement(TaskDetailScreen, {
      task: openTask,
      onBack: () => setOpenTaskId(null),
      onToggle: toggleTask,
      dark: dark
    });
  } else if (tab === 'home') {
    content = /*#__PURE__*/React.createElement(HomeScreen, {
      tasks: tasks,
      onToggle: toggleTask,
      onOpenTask: setOpenTaskId,
      onAdd: () => setAdding(true),
      dark: dark
    });
  } else if (tab === 'search') {
    content = /*#__PURE__*/React.createElement(SearchScreen, {
      dark: dark
    });
  } else if (tab === 'inbox') {
    content = /*#__PURE__*/React.createElement(InboxScreen, {
      dark: dark
    });
  } else if (tab === 'profile') {
    content = /*#__PURE__*/React.createElement(ProfileScreen, {
      dark: dark,
      onToggleDark: setDark
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "stage",
    "data-theme": dark ? 'dark' : 'light'
  }, /*#__PURE__*/React.createElement(IOSDevice, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    className: `brand-bg ${dark ? 'dark' : ''}`,
    style: {
      height: '100%',
      position: 'relative'
    }
  }, content, signedIn && !openTask && /*#__PURE__*/React.createElement(TabBar, {
    tabs: TABS,
    value: tab,
    onChange: setTab,
    dark: dark
  }), adding && /*#__PURE__*/React.createElement(AddTaskSheet, {
    onClose: () => setAdding(false),
    onAdd: addTask,
    dark: dark
  }))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios/components.jsx
try { (() => {
/* Shared icon set and small primitives used across iOS UI kit screens.
   Loaded after ios-frame.jsx and React. Exposes to window. */

const Icon = ({
  name,
  size = 20,
  color = 'currentColor',
  fill = 'none',
  strokeWidth = 1.5
}) => {
  const paths = {
    home: /*#__PURE__*/React.createElement("path", {
      d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"
    }),
    homeFill: /*#__PURE__*/React.createElement("path", {
      d: "M3 12 12 3l9 9v8a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z",
      fill: color,
      stroke: "none"
    }),
    search: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3"
    })),
    bell: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
    })),
    user: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "7",
      r: "4"
    })),
    plus: /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14M12 5v14"
    }),
    check: /*#__PURE__*/React.createElement("polyline", {
      points: "20 6 9 17 4 12",
      strokeWidth: "2.5"
    }),
    chevronRight: /*#__PURE__*/React.createElement("polyline", {
      points: "9 18 15 12 9 6"
    }),
    chevronLeft: /*#__PURE__*/React.createElement("polyline", {
      points: "15 18 9 12 15 6"
    }),
    arrowLeft: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: "19",
      y1: "12",
      x2: "5",
      y2: "12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 19 5 12 12 5"
    })),
    more: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "1.5",
      fill: color
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "19",
      cy: "12",
      r: "1.5",
      fill: color
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "5",
      cy: "12",
      r: "1.5",
      fill: color
    })),
    calendar: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "2",
      x2: "16",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "8",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "10",
      x2: "21",
      y2: "10"
    })),
    flag: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "22",
      x2: "4",
      y2: "15"
    })),
    moon: /*#__PURE__*/React.createElement("path", {
      d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
    }),
    lock: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "11",
      width: "18",
      height: "11",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 11V7a5 5 0 0 1 10 0v4"
    })),
    bell2: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13.73 21a2 2 0 0 1-3.46 0"
    })),
    creditCard: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "5",
      width: "20",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "2",
      y1: "10",
      x2: "22",
      y2: "10"
    })),
    logout: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "16 17 21 12 16 7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "12",
      x2: "9",
      y2: "12"
    })),
    inbox: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polyline", {
      points: "22 12 16 12 14 15 10 15 8 12 2 12"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
    })),
    clock: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 6 12 12 16 14"
    })),
    star: /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    }),
    paperclip: /*#__PURE__*/React.createElement("path", {
      d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
    }),
    repeat: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polyline", {
      points: "17 1 21 5 17 9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 11V9a4 4 0 0 1 4-4h14"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "7 23 3 19 7 15"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 13v2a4 4 0 0 1-4 4H3"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, paths[name]);
};

/* ---------- Avatar ---------- */
const Avatar = ({
  initials,
  size = 40,
  tone = 'green',
  src
}) => {
  const tones = {
    green: {
      bg: '#ECFDF3',
      fg: '#027A48'
    },
    amber: {
      bg: '#FFFBEB',
      fg: '#B45309'
    },
    blue: {
      bg: '#EFF6FF',
      fg: '#1D4ED8'
    },
    pink: {
      bg: '#FDF2F8',
      fg: '#9D174D'
    },
    purple: {
      bg: '#F5F3FF',
      fg: '#5B21B6'
    },
    gray: {
      bg: '#F4F4F5',
      fg: '#3F3F46'
    }
  };
  const t = tones[tone] || tones.green;
  return /*#__PURE__*/React.createElement("div", {
    className: "k-avatar",
    style: {
      width: size,
      height: size,
      background: t.bg,
      color: t.fg,
      fontSize: Math.round(size * 0.36)
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    style: {
      width: '100%',
      height: '100%',
      borderRadius: '50%'
    }
  }) : initials);
};

/* ---------- Tag ---------- */
const Tag = ({
  tone = 'green',
  children,
  dot
}) => /*#__PURE__*/React.createElement("span", {
  className: `k-tag ${tone}`
}, dot && /*#__PURE__*/React.createElement("span", {
  className: "dot"
}), children);

/* ---------- Checkbox (round, iOS style) ---------- */
const Checkbox = ({
  checked,
  onChange
}) => /*#__PURE__*/React.createElement("button", {
  className: `k-checkbox ${checked ? 'checked' : ''}`,
  onClick: () => onChange && onChange(!checked),
  "aria-checked": checked
}, /*#__PURE__*/React.createElement(Icon, {
  name: "check",
  size: 12,
  color: "currentColor",
  strokeWidth: 3
}));

/* ---------- Inset grouped list (brand styled — squarer than IOSList) ---------- */
const ListGroup = ({
  header,
  children,
  dark = false
}) => {
  const hc = dark ? 'rgba(235,235,245,0.6)' : '#71717A';
  const bg = dark ? '#1C1C1E' : '#FFFFFF';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 0.08 + 'em',
      textTransform: 'uppercase',
      color: hc,
      padding: '8px 32px 6px'
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 14,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
};
const ListRow = ({
  icon,
  iconBg = '#12B76A',
  title,
  detail,
  trailing,
  chevron = false,
  onClick,
  isLast = false,
  dark = false,
  destructive = false
}) => {
  const text = destructive ? '#EF4444' : dark ? '#FAFAFA' : '#09090B';
  const sec = dark ? 'rgba(235,235,245,0.6)' : '#71717A';
  const ter = dark ? 'rgba(235,235,245,0.3)' : '#D4D4D8';
  const sep = dark ? 'rgba(84,84,88,0.5)' : '#F4F4F5';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '12px 16px',
      position: 'relative',
      cursor: onClick ? 'pointer' : 'default'
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      background: iconBg,
      marginRight: 12,
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      color: '#FFF'
    }
  }, typeof icon === 'string' ? /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16,
    color: "#FFF"
  }) : icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 16,
      color: text,
      fontWeight: 500
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      fontSize: 15,
      marginRight: 6
    }
  }, detail), trailing, chevron && /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 16,
    color: ter,
    strokeWidth: 2
  }), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
};

/* ---------- Brand nav bar (replaces iOS frame's pill variant) ---------- */
const NavBar = ({
  title,
  large = false,
  leading,
  trailing,
  dark = false
}) => {
  const text = dark ? '#FAFAFA' : '#09090B';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 16px',
      minHeight: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      display: 'flex',
      justifyContent: 'flex-start'
    }
  }, leading), !large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontSize: 17,
      fontWeight: 600,
      color: text
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, trailing)), large && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 8px',
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: '-0.022em',
      color: text,
      lineHeight: 1.12
    }
  }, title));
};

/* ---------- FAB ---------- */
const FAB = ({
  onClick,
  icon = 'plus'
}) => /*#__PURE__*/React.createElement("button", {
  className: "k-fab",
  onClick: onClick,
  "aria-label": "Add"
}, /*#__PURE__*/React.createElement(Icon, {
  name: icon,
  size: 22,
  color: "#FFF",
  strokeWidth: 2.5
}));

/* ---------- Brand tab bar ---------- */
const TabBar = ({
  tabs,
  value,
  onChange,
  dark = false
}) => /*#__PURE__*/React.createElement("div", {
  className: `tab-bar ${dark ? 'dark' : ''}`,
  style: dark ? {
    background: 'rgba(20,20,22,0.82)'
  } : null
}, tabs.map(t => /*#__PURE__*/React.createElement("div", {
  key: t.id,
  className: `tab ${value === t.id ? 'active' : ''}`,
  onClick: () => onChange(t.id)
}, /*#__PURE__*/React.createElement(Icon, {
  name: value === t.id && t.activeIcon ? t.activeIcon : t.icon,
  size: 26,
  strokeWidth: 1.6
}), /*#__PURE__*/React.createElement("span", null, t.label))));

/* ---------- Linkable text button (nav action) ---------- */
const TextButton = ({
  children,
  onClick,
  color = '#12B76A',
  dark = false
}) => /*#__PURE__*/React.createElement("button", {
  onClick: onClick,
  style: {
    background: 'none',
    border: 0,
    padding: '6px 4px',
    color: dark ? '#32D583' : color,
    fontFamily: 'inherit',
    fontSize: 17,
    fontWeight: 500,
    cursor: 'pointer'
  }
}, children);
Object.assign(window, {
  Icon,
  Avatar,
  Tag,
  Checkbox,
  ListGroup,
  ListRow,
  NavBar,
  FAB,
  TabBar,
  TextButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios/ios-frame.jsx
try { (() => {
/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios/screens.jsx
try { (() => {
/* Screens for the iOS UI kit prototype.
   App concept: "Stride" — a focused task / day-planner app.
   Loaded after components.jsx. Exposes screen components to window. */

const COLORS = {
  bg: l => l ? '#F4F4F5' : '#09090B',
  card: l => l ? '#FFFFFF' : '#1C1C1E',
  fg: l => l ? '#09090B' : '#FAFAFA',
  fgMuted: l => l ? '#71717A' : '#A1A1AA',
  fgSubtle: l => l ? '#A1A1AA' : '#71717A',
  border: l => l ? '#E4E4E7' : '#2A2A2C',
  accent: l => l ? '#12B76A' : '#32D583',
  accentSoft: l => l ? '#ECFDF3' : 'rgba(50,213,131,0.14)'
};

/* ──────────────── SIGN IN ──────────────── */
function SignInScreen({
  onSignIn,
  dark
}) {
  const [email, setEmail] = React.useState('tomas@havlicek.dev');
  const [pwd, setPwd] = React.useState('');
  const fg = COLORS.fg(!dark);
  const muted = COLORS.fgMuted(!dark);
  const bg = dark ? '#0A0A0B' : '#FFFFFF';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      background: bg,
      display: 'flex',
      flexDirection: 'column',
      padding: '120px 24px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 14,
      background: '#12B76A',
      display: 'grid',
      placeItems: 'center',
      marginBottom: 22,
      boxShadow: '0 8px 20px rgba(18,183,106,0.28)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#FFF',
      fontSize: 30,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '-0.04em'
    }
  }, "S")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: '-0.022em',
      color: fg,
      marginBottom: 8,
      lineHeight: 1.12
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: muted,
      lineHeight: 1.45
    }
  }, "Sign in to pick up where you left off.")), /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      gap: 12,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "k-input",
    type: "email",
    placeholder: "Email",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement("input", {
    className: "k-input",
    type: "password",
    placeholder: "Password",
    value: pwd,
    onChange: e => setPwd(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "k-btn primary full",
    onClick: onSignIn
  }, "Sign in"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(TextButton, {
    dark: dark
  }, "Forgot password?"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: 14,
      color: muted
    }
  }, "New here? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: dark ? '#32D583' : '#12B76A',
      fontWeight: 600
    }
  }, "Create an account")));
}

/* ──────────────── HOME (Today) ──────────────── */
function HomeScreen({
  tasks,
  onToggle,
  onOpenTask,
  onAdd,
  dark
}) {
  const fg = COLORS.fg(!dark);
  const muted = COLORS.fgMuted(!dark);
  const grouped = {
    Morning: tasks.filter(t => t.group === 'Morning'),
    Afternoon: tasks.filter(t => t.group === 'Afternoon'),
    Anytime: tasks.filter(t => t.group === 'Anytime')
  };
  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pct = total ? Math.round(done / total * 100) : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll screen-content",
    style: {
      height: '100%',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    title: "Today",
    large: true,
    leading: null,
    trailing: /*#__PURE__*/React.createElement("button", {
      style: {
        background: 'rgba(120,120,128,0.16)',
        border: 0,
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      initials: "TH",
      size: 32,
      tone: "green"
    })),
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: dark ? '#1C1C1E' : '#FFFFFF',
      borderRadius: 16,
      padding: 18,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 56,
      height: 56
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 36 36",
    style: {
      transform: 'rotate(-90deg)'
    },
    width: "56",
    height: "56"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "18",
    r: "15.9",
    fill: "none",
    stroke: dark ? '#2A2A2C' : '#F4F4F5',
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "18",
    r: "15.9",
    fill: "none",
    stroke: "#12B76A",
    strokeWidth: "3",
    strokeDasharray: `${pct} 100`,
    strokeLinecap: "round",
    pathLength: "100"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      fontSize: 14,
      fontWeight: 700,
      color: fg
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      color: fg,
      marginBottom: 2
    }
  }, done, " of ", total, " done"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: muted
    }
  }, total - done > 0 ? `${total - done} task${total - done === 1 ? '' : 's'} left for today` : "You're all caught up.")))), Object.entries(grouped).map(([group, items]) => items.length > 0 && /*#__PURE__*/React.createElement("div", {
    key: group,
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 24px 6px',
      fontSize: 13,
      fontWeight: 600,
      color: muted,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, group), /*#__PURE__*/React.createElement(ListGroup, {
    dark: dark
  }, items.map((t, i) => /*#__PURE__*/React.createElement(TaskRow, {
    key: t.id,
    task: t,
    onToggle: onToggle,
    onOpen: () => onOpenTask(t.id),
    isLast: i === items.length - 1,
    dark: dark
  }))))), /*#__PURE__*/React.createElement(FAB, {
    onClick: onAdd
  }));
}
function TaskRow({
  task,
  onToggle,
  onOpen,
  isLast,
  dark
}) {
  const text = dark ? '#FAFAFA' : '#09090B';
  const muted = dark ? '#A1A1AA' : '#71717A';
  const sep = dark ? 'rgba(84,84,88,0.5)' : '#F4F4F5';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 56,
      padding: '12px 16px',
      position: 'relative',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: task.done,
    onChange: () => onToggle(task.id)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: onOpen,
    style: {
      flex: 1,
      minWidth: 0,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      color: text,
      textDecoration: task.done ? 'line-through' : 'none',
      opacity: task.done ? 0.45 : 1,
      marginBottom: task.time || task.tag ? 4 : 0
    }
  }, task.title), (task.time || task.tag) && /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 8
    }
  }, task.time && /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 4,
      color: muted,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 12,
    color: muted
  }), /*#__PURE__*/React.createElement("span", null, task.time)), task.tag && /*#__PURE__*/React.createElement(Tag, {
    tone: task.tag.tone
  }, task.tag.label))), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 50,
      right: 0,
      height: 0.5,
      background: sep
    }
  }));
}

/* ──────────────── TASK DETAIL ──────────────── */
function TaskDetailScreen({
  task,
  onBack,
  onToggle,
  dark
}) {
  const fg = COLORS.fg(!dark);
  const muted = COLORS.fgMuted(!dark);
  if (!task) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll screen-content",
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    title: "",
    leading: /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        background: 'none',
        border: 0,
        padding: '6px 4px',
        color: dark ? '#32D583' : '#12B76A',
        fontSize: 17,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronLeft",
      size: 20,
      color: dark ? '#32D583' : '#12B76A',
      strokeWidth: 2.5
    }), /*#__PURE__*/React.createElement("span", null, "Today")),
    trailing: /*#__PURE__*/React.createElement("button", {
      style: {
        background: 'rgba(120,120,128,0.16)',
        border: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "more",
      size: 18,
      color: fg
    })),
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 14,
      marginBottom: 24,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: task.done,
    onChange: () => onToggle(task.id)
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      flex: 1,
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: '-0.018em',
      color: fg,
      lineHeight: 1.2,
      textDecoration: task.done ? 'line-through' : 'none',
      opacity: task.done ? 0.5 : 1
    }
  }, task.title)), /*#__PURE__*/React.createElement(ListGroup, {
    dark: dark
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "calendar",
    iconBg: "#EF4444",
    title: "Today",
    detail: task.time || 'No time',
    isLast: false,
    dark: dark
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "flag",
    iconBg: "#F59E0B",
    title: "Priority",
    detail: task.priority || 'Medium',
    isLast: false,
    dark: dark
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "repeat",
    iconBg: "#3B82F6",
    title: "Repeat",
    detail: "None",
    isLast: true,
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 8px',
      fontSize: 11,
      fontWeight: 600,
      color: muted,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginTop: 4
    }
  }, "Subtasks"), /*#__PURE__*/React.createElement(ListGroup, {
    dark: dark
  }, (task.subtasks || []).map((s, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      borderBottom: i < arr.length - 1 ? `0.5px solid ${dark ? 'rgba(84,84,88,0.5)' : '#F4F4F5'}` : 'none'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: s.done,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 16,
      color: fg,
      opacity: s.done ? 0.45 : 1,
      textDecoration: s.done ? 'line-through' : 'none'
    }
  }, s.title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 8px',
      fontSize: 11,
      fontWeight: 600,
      color: muted,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginTop: 4
    }
  }, "Notes"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: dark ? '#1C1C1E' : '#FFFFFF',
      borderRadius: 14,
      margin: '0 16px',
      padding: 16,
      fontSize: 15,
      color: fg,
      lineHeight: 1.5
    }
  }, task.notes || 'Tap to add notes…')));
}

/* ──────────────── INBOX ──────────────── */
function InboxScreen({
  dark
}) {
  const fg = COLORS.fg(!dark);
  const items = [{
    id: 1,
    name: 'Jamie Donoghue',
    text: 'assigned you to "Q3 planning doc"',
    time: '4m',
    tone: 'green',
    unread: true
  }, {
    id: 2,
    name: 'Sam Park',
    text: 'commented on "Onboarding redesign"',
    time: '1h',
    tone: 'amber',
    unread: true
  }, {
    id: 3,
    name: 'Riya Anand',
    text: 'approved your time off request',
    time: '3h',
    tone: 'blue',
    unread: false
  }, {
    id: 4,
    name: 'Marcus Lee',
    text: 'shared "Roadmap v2" with you',
    time: 'Yesterday',
    tone: 'purple',
    unread: false
  }, {
    id: 5,
    name: 'Eva Bauer',
    text: 'mentioned you in "Design crit notes"',
    time: 'Mon',
    tone: 'pink',
    unread: false
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll screen-content",
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    title: "Inbox",
    large: true,
    dark: dark
  }), /*#__PURE__*/React.createElement(ListGroup, {
    dark: dark
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '14px 16px',
      gap: 12,
      borderBottom: i < items.length - 1 ? `0.5px solid ${dark ? 'rgba(84,84,88,0.5)' : '#F4F4F5'}` : 'none',
      position: 'relative'
    }
  }, it.unread && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 6,
      top: 24,
      width: 8,
      height: 8,
      borderRadius: 4,
      background: '#12B76A'
    }
  }), /*#__PURE__*/React.createElement(Avatar, {
    initials: it.name.split(' ').map(n => n[0]).join(''),
    tone: it.tone
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: fg,
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, it.name), " ", it.text), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: dark ? '#71717A' : '#A1A1AA',
      marginTop: 3
    }
  }, it.time))))));
}

/* ──────────────── PROFILE ──────────────── */
function ProfileScreen({
  dark,
  onToggleDark
}) {
  const fg = COLORS.fg(!dark);
  const muted = COLORS.fgMuted(!dark);
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll screen-content",
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    title: "Profile",
    large: true,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: dark ? '#1C1C1E' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "TH",
    size: 56,
    tone: "green"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      color: fg
    }
  }, "Tomas Havlicek"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: muted,
      marginTop: 2
    }
  }, "tomas@havlicek.dev")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 16,
    color: muted
  }))), /*#__PURE__*/React.createElement(ListGroup, {
    header: "Account",
    dark: dark
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "bell2",
    iconBg: "#EF4444",
    title: "Notifications",
    chevron: true,
    dark: dark
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "moon",
    iconBg: "#3F3F46",
    title: "Dark mode",
    trailing: /*#__PURE__*/React.createElement(Toggle, {
      on: dark,
      onChange: onToggleDark
    }),
    isLast: true,
    dark: dark
  })), /*#__PURE__*/React.createElement(ListGroup, {
    header: "Subscription",
    dark: dark
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "star",
    iconBg: "#F59E0B",
    title: "Stride Pro",
    detail: "Trial \xB7 3 days left",
    chevron: true,
    dark: dark
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "creditCard",
    iconBg: "#12B76A",
    title: "Billing",
    chevron: true,
    isLast: true,
    dark: dark
  })), /*#__PURE__*/React.createElement(ListGroup, {
    header: "Security",
    dark: dark
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "lock",
    iconBg: "#3B82F6",
    title: "Privacy & security",
    chevron: true,
    isLast: true,
    dark: dark
  })), /*#__PURE__*/React.createElement(ListGroup, {
    dark: dark
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "logout",
    iconBg: "#EF4444",
    title: "Sign out",
    destructive: true,
    isLast: true,
    dark: dark
  })));
}

/* Small iOS-style toggle (also exposed) */
function Toggle({
  on,
  onChange
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange && onChange(!on),
    style: {
      width: 51,
      height: 31,
      borderRadius: 16,
      background: on ? '#12B76A' : '#E4E4E7',
      border: 0,
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 200ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 22 : 2,
      width: 27,
      height: 27,
      borderRadius: '50%',
      background: '#FFF',
      boxShadow: '0 2px 4px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.2)',
      transition: 'left 200ms cubic-bezier(0.34, 1.42, 0.5, 1)'
    }
  }));
}

/* ──────────────── ADD TASK (modal sheet) ──────────────── */
function AddTaskSheet({
  onClose,
  onAdd,
  dark
}) {
  const fg = COLORS.fg(!dark);
  const muted = COLORS.fgMuted(!dark);
  const [title, setTitle] = React.useState('');
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.45)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: dark ? '#18181B' : '#FFFFFF',
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: '12px 0 32px',
      maxHeight: '80%',
      boxShadow: '0 -8px 32px rgba(0,0,0,0.15)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 5,
      borderRadius: 3,
      background: dark ? '#3F3F46' : '#D4D4D8',
      margin: '0 auto 12px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(TextButton, {
    onClick: onClose,
    color: "#71717A",
    dark: dark
  }, "Cancel"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      color: fg
    }
  }, "New task"), /*#__PURE__*/React.createElement(TextButton, {
    onClick: () => title.trim() && onAdd(title.trim()),
    dark: dark
  }, "Add")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    className: "k-input",
    placeholder: "What needs to be done?",
    value: title,
    onChange: e => setTitle(e.target.value),
    style: {
      height: 56,
      fontSize: 18
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 8,
      marginTop: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(ChipButton, {
    icon: "calendar",
    label: "Today",
    dark: dark
  }), /*#__PURE__*/React.createElement(ChipButton, {
    icon: "clock",
    label: "Time",
    dark: dark
  }), /*#__PURE__*/React.createElement(ChipButton, {
    icon: "flag",
    label: "Priority",
    dark: dark
  }), /*#__PURE__*/React.createElement(ChipButton, {
    icon: "repeat",
    label: "Repeat",
    dark: dark
  })))));
}
function ChipButton({
  icon,
  label,
  dark
}) {
  return /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 34,
      padding: '0 14px',
      borderRadius: 17,
      background: dark ? '#27272A' : '#F4F4F5',
      color: dark ? '#FAFAFA' : '#09090B',
      border: 0,
      fontFamily: 'inherit',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14,
    color: "currentColor"
  }), label);
}
Object.assign(window, {
  SignInScreen,
  HomeScreen,
  TaskDetailScreen,
  InboxScreen,
  ProfileScreen,
  AddTaskSheet,
  Toggle,
  ChipButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios/screens.jsx", error: String((e && e.message) || e) }); }

})();
