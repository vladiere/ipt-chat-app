import { Loading, QSpinnerTail } from 'quasar';

export const SpinnerTail = (time_out: number, message?: string) => {
  Loading.show({
    message: message,
    spinner: QSpinnerTail,
    spinnerColor: 'primary',
    spinnerSize: 120,
    backgroundColor: 'grey-10',
    messageColor: 'grey-11',
  });
  setTimeout(() => {
    Loading.hide();
  }, time_out);
}
