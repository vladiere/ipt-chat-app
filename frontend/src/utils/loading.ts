import { Loading, QSpinnerTail } from 'quasar';

export const SpinnerTail = (load_state: boolean, message?: string) => {
  if (load_state) {
    Loading.show({
      message: message,
      spinner: QSpinnerTail,
      spinnerColor: 'primary',
      spinnerSize: 120,
      backgroundColor: 'grey-10',
      messageColor: 'grey-11',
    });
  } else {
    Loading.hide();
  }
}
