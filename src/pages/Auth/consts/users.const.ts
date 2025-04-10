export const DELETE_USER_ALERT_CONFIG = {
    header: 'USERS.DELETE_USER_TITLE',
    message: 'USERS.DELETE_USER_WARNING',
    buttons: [
        {
          text: 'COMMON.LABELS.CANCEL',
          role: 'cancel',
          cssClass: 'ion-text-medium'
        },
        {
          text: 'COMMON.LABELS.DELETE',
          role: 'delete',
          cssClass: 'ion-text-danger'
        }
    ]
};

export const EDIT_USER_SUCCESS_TOAST = {
  color: 'success',
  message: 'USERS.EDIT_SUCCESS',
  duration: 1000
}

export const EDIT_USER_FAILED_TOAST = {
  color: 'danger',
  message: 'USERS.EDIT_FAILED',
  duration: 1000
}
