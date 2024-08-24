// import MainToast from 'react-native-root-toast';

const config = {
  // duration: MainToast.durations.LONG,
  // position: MainToast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
};

function showToast(message, customConfig = {}) {
  //MainToast.show(message, {...config, ...customConfig});
}

function errorToast(message, customConfig = {}) {
  showToast(message, {
    backgroundColor: 'rgb(140,28,28)',
    textColor: '#FFFFFF',
    ...customConfig,
  });
}

function shortErrorToast(message) {
  showToast(message, {
    backgroundColor: 'rgb(140,28,28)',
    textColor: '#FFFFFF',
    duration: MainToast.durations.SHORT,
  });
}

function successToast(message) {
  showToast(message, {
    backgroundColor: 'rgb(51,134,27)',
    textColor: '#FFFFFF',
  });
}

export default showToast;
export {errorToast, successToast, shortErrorToast};
