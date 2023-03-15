import './ConfirmationModal.css';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/es';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

moment.locale('es');

const buttonBox = makeStyles(() => ({
  buttonLeft: {
    backgroundColor: 'grey',
    color: 'white',
    marginRight: '0.5rem',
    padding: '6px 12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'lightgrey',
      color: 'dimgray',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  buttonRight: {
    backgroundColor: '#8c50ff',
    color: 'white',
    marginLeft: '0.5rem',
    padding: '6px 12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0D3B66',
    },
    '&:focus': {
      outline: 'none',
    },
  },
}));

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  title,
  message,
  onConfirm,
}) => {
  const classes = buttonBox();

  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      fullWidth={true}
      maxWidth="xs"
      style={{ minWidth: '340px' }}
    >
      <>
        <DialogTitle
          id="customized-dialog-title"
          style={{
            padding: '0.8rem',
            position: 'relative',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent dividers style={{ textAlign: 'center' }}>
          {message}

          <div className="row-buttons-modal">
            <div className="col-buttons-modal">
              <button
                className={classes.buttonLeft}
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>

            <div className="col-buttons-modal">
              <button className={classes.buttonRight} onClick={onConfirm}>
                Aceptar
              </button>
            </div>
          </div>
        </DialogContent>
      </>
    </Dialog>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
