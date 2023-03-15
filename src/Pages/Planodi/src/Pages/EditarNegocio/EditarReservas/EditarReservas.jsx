import "./EditarReservas.css";
import React, { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import "moment/locale/es";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DeleteIcon from "@material-ui/icons/Delete";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";

import { userHeaders } from "../../../Utils/headerSetter";
import DatePicker from "../../../componentes/DatePicker/DatePicker";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";

moment.locale("es");

const buttonBox = makeStyles(() => ({
  button: {
    backgroundColor: "#8c50ff",
    color: "white",
    marginLeft: "0.5rem",
    padding: "6px 12px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0D3B66",
    },
    "&:focus": {
      outline: "none",
    },
    "&:disabled": {
      backgroundColor: "lightGrey",
      borderColor: "lightGrey",
      color: "grey",
      cursor: "auto",
    },
  },
  buttonMobile: {
    width: "100%",
    backgroundColor: "#8c50ff",
    color: "white",
    padding: "6px 12px",
    cursor: "pointer",
    "&:focus": {
      outline: "none",
    },
    "&:disabled": {
      backgroundColor: "lightGrey",
      borderColor: "lightGrey",
      color: "grey",
      cursor: "auto",
    },
  },
  buttonIcon: {
    backgroundColor: "#8c50ff",
    color: "white",
    fontSize: "0.25rem",
    padding: "2px",
    "&:hover": {
      backgroundColor: "#0D3B66",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const sendReservation = ({ idAliado, date, onSave }) => {
  axios
    .post(
      `${
        process.env.REACT_APP_ENV === "development"
          ? process.env.REACT_APP_API_LOCAL
          : process.env.REACT_APP_API_PROD
      }user/saveDate`,
      { idAliado, date: moment(date).format() },
      userHeaders()
    )
    .then(() => {
      onSave();
    })
    .catch(() => {
      toast.error("Parece que hubo un error al reservar la fecha!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};

const deleteReservation = ({ idReserva, onSave }) =>
  axios
    .post(
      `${
        process.env.REACT_APP_ENV === "development"
          ? process.env.REACT_APP_API_LOCAL
          : process.env.REACT_APP_API_PROD
      }user/deleteDate`,
      { idReserva },
      userHeaders()
    )
    .then(() => {
      onSave();
    })
    .catch(() => {
      toast.error("Parece que hubo un error al cancelar la reserva!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });

const EditarReservas = ({
  idAliado,
  dateSelected,
  setDateSelected,
  busyDates,
  onSave,
  isCollapsible,
  isSelected,
  setIsSelected,
}) => {
  const classes = buttonBox();
  const mobile = useMediaQuery("(max-width:960px)");

  const [filter, setFilter] = useState("");
  const [filterDates, setFilterDates] = useState(busyDates);
  const [collapse, setCollapse] = useState(!isSelected);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isCancelationModalOpen, setIsCancelationModalOpen] = useState(false);

  useEffect(() => {
    if (isCollapsible && !isSelected) setCollapse(true);
  }, [isCollapsible, isSelected]);

  useEffect(() => {
    if (!!filter) {
      setFilterDates(
        busyDates.filter(({ fechaReserva }) => {
          return moment(fechaReserva).format("LL").includes(filter);
        })
      );
    } else setFilterDates(busyDates);
  }, [filter, busyDates]);

  return (
    <>
      {mobile ? (
        <>
          <p
            className={"url-txt-instruc-ed-neg"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (collapse) setIsSelected(7);
              setCollapse(!collapse);
            }}
          >
            {isCollapsible && (
              <span>
                {!collapse ? (
                  <IoIosArrowDown
                    style={{ marginRight: "15px", marginBottom: "5px" }}
                  />
                ) : (
                  <IoIosArrowForward
                    style={{ marginRight: "15px", marginBottom: "5px" }}
                  />
                )}
              </span>
            )}
            Bloquear fechas
          </p>

          {(!collapse || !isCollapsible) && (
            <>
              <span>Seleccionar Fecha:</span>

              <div className="row-mobile-ed-rsv">
                <DatePicker
                  value={dateSelected}
                  onChange={(value) => {
                    setDateSelected(value);
                  }}
                  clear={!!dateSelected}
                  tileDisabled={({ date }) => {
                    let isDisbale = false;
                    busyDates.forEach(({ fechaReserva }) => {
                      const completeDate = new Date(fechaReserva);
                      if (completeDate.getTime() === date.getTime())
                        isDisbale = true;
                    });

                    return isDisbale;
                  }}
                />
              </div>

              <div className="row-mobile-ed-rsv">
                <button
                  className={classes.buttonMobile}
                  disabled={!dateSelected}
                  onClick={() => setIsReservationModalOpen(true)}
                >
                  Bloquear
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <span>Seleccionar Fecha:</span>

          <div className="row-ed-rsv">
            <div className="big-col-ed-rsv">
              <DatePicker
                value={dateSelected}
                onChange={(value) => {
                  setDateSelected(value);
                }}
                clear={!!dateSelected}
                tileDisabled={({ date }) => {
                  let isDisbale = false;
                  busyDates.forEach(({ fechaReserva }) => {
                    const completeDate = new Date(fechaReserva);
                    if (completeDate.getTime() === date.getTime())
                      isDisbale = true;
                  });

                  return isDisbale;
                }}
              />
            </div>

            <div className="small-col-ed-rsv">
              <button
                className={classes.button}
                disabled={!dateSelected}
                onClick={() => setIsReservationModalOpen(true)}
              >
                Bloquear
              </button>
            </div>
          </div>
        </>
      )}

      {(!collapse || !isCollapsible) && busyDates.length > 0 && (
        <div className="table-wrapper-ed-rsv">
          <span>Mis Reservas:</span>

          <div className="row-ed-rsv">
            <input
              className="input-filter-ed-rsv"
              type="text"
              id="name"
              name="name"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              placeholder="Buscar fecha, Ej. 1 de Enero"
            />
          </div>

          <table className="table-ed-rsv">
            <thead>
              <tr>
                <th>Fecha</th>

                <th>Cancelar</th>
              </tr>
            </thead>

            <tbody>
              {filterDates.map(({ id, fechaReserva }) => {
                return (
                  <tr key={id}>
                    <td>{moment(fechaReserva).format("LL")}</td>

                    <td style={{ alignItems: "center" }}>
                      <button
                        className={classes.buttonIcon}
                        onClick={() => {
                          setSelectedId(id);
                          setSelectedDate(fechaReserva);
                          setIsCancelationModalOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!!filter && filterDates.length === 0 && (
            <div className="table-no-results-ed-rsv">
              No se encontraron reservaciones
            </div>
          )}
        </div>
      )}

      <ConfirmationModal
        isOpen={isReservationModalOpen}
        setIsOpen={setIsReservationModalOpen}
        message={
          <span>
            ¿Seguro que deseas reservar el día
            <span style={{ fontWeight: "bold" }}>
              {` ${moment(dateSelected).format("LL")}`}
            </span>{" "}
            de tu calendario? Los usuarios ya no podrán seleccionar esa fecha.
          </span>
        }
        title="Nueva reservación"
        onConfirm={() =>
          sendReservation({ idAliado, date: dateSelected, onSave })
        }
      />

      <ConfirmationModal
        isOpen={isCancelationModalOpen}
        setIsOpen={setIsCancelationModalOpen}
        message={
          <span>
            ¿Seguro que deseas cancelar la reservación del día
            <span style={{ fontWeight: "bold" }}>{` ${moment(
              selectedDate
            ).format("LL")}`}</span>
            ? Los usuarios podrán seleccionar esa fecha de nuevo.
          </span>
        }
        title="Cancelar reserva"
        onConfirm={() => deleteReservation({ idReserva: selectedId, onSave })}
      />
    </>
  );
};

EditarReservas.propTypes = {
  idAliado: PropTypes.number.isRequired,
  dateSelected: PropTypes.instanceOf(Date),
  setDateSelected: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  busyDates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      fechaReserva: PropTypes.string,
    })
  ),
  isCollapsible: PropTypes.bool,
  isSelected: PropTypes.bool,
  setIsSelected: PropTypes.func,
};

EditarReservas.defaultProps = {
  setIsSelected: () => null,
  dateSelected: null,
  isCollapsible: false,
  isSelected: false,
  busyDates: [],
};

export default EditarReservas;
