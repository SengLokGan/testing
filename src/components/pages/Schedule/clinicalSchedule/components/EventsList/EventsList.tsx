import Box from '@mui/material/Box';
import { ClinicalScheduleEventType } from '@enums/pages/Schedule';
import { ClinicalEvent } from '@types';
import { useTranslation } from 'react-i18next';
import { getEventTypeColor } from '@components/pages/Schedule/clinicalSchedule/utils/getEventTypeColor';
import Stack from '@mui/material/Stack';
import { IconButton, Popover, Typography } from '@mui/material';
import { useRef, useState, useMemo, useEffect } from 'react';
import {
  getPopoverPosition,
  getPopoverStyle,
} from '@components/pages/Schedule/patientsSchedule/components/Appointment/utils';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CustomEventCard } from '@components/pages/Schedule/clinicalSchedule/components/CustomEventCard/CustomEventCard';
import i18n from 'i18next';
import { QuarterlyBloodTestCard } from '@components/pages/Schedule/clinicalSchedule/components/QuarterlyBloodTestCard/QuarterlyBloodTestCard';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { UserPermissions } from '@enums/store';
import { PermissionGuard } from '@guards/PermissionGuard';
import { addServiceModal, deleteEvent } from '@store/slices';
import { ServiceModalName } from '@enums/components';
import { useAppDispatch } from '@hooks/storeHooks';
import { compareDesc, parse } from 'date-fns';
import { getTenantStartCurrentDay } from '@utils/getTenantDate';
import { useSearchParams } from 'react-router-dom';
import { delay } from '@utils';
import { DoctorReviewEventCard } from '@components/pages/Schedule/clinicalSchedule/components/DoctorReviewEventCard/DoctorReviewEventCard';

type EventsListProps = {
  events: ClinicalEvent[];
  onClose: () => void;
  date: Date;
};

const POPUP_WIDTH = 336;

export const getEventTypeLabel = (type: ClinicalScheduleEventType) => {
  switch (type) {
    case ClinicalScheduleEventType.NephrologistVisit:
      return i18n.t('schedule:neph');
    case ClinicalScheduleEventType.PICVisit:
      return i18n.t('schedule:pic');
    default:
      return null;
  }
};

export const EventsList = ({ events, onClose, date }: EventsListProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeEvent, setActiveEvent] = useState<ClinicalEvent | null>(null);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeEventId = searchParams.get('activeEventId');

  const { t } = useTranslation('schedule');
  const { t: tCommon } = useTranslation('common');
  const eventCardRefs = useRef<HTMLElement[]>([]);

  const isFuture = useMemo(() => {
    return compareDesc(getTenantStartCurrentDay(), date) === 1;
  }, [date]);

  useEffect(() => {
    activeEventId &&
      events.forEach(async (event, index) => {
        if (`${event.id}` === activeEventId) {
          setActiveEvent(event);
          await delay(100);
          setAnchorEl(eventCardRefs.current[index]);

          searchParams.delete('activeEventId');
          searchParams.delete('date');
          setSearchParams(searchParams);
        }
      });
  }, [activeEventId, events]);

  const getEventTypeTitle = (event: ClinicalEvent) => {
    switch (event.type) {
      case ClinicalScheduleEventType.CustomEvent:
        return event.title;
      case ClinicalScheduleEventType.PICVisit:
      case ClinicalScheduleEventType.NephrologistVisit:
        return event?.doctor?.name;
      case ClinicalScheduleEventType.StaffHepBVaccination:
      case ClinicalScheduleEventType.StaffSerologyScreening:
      case ClinicalScheduleEventType.QuarterlyBloodTest:
        return t(`events.${event.type}`);
    }
  };

  const onEventClick = (index, event: ClinicalEvent) => {
    setAnchorEl(eventCardRefs.current[index]);
    setActiveEvent(event);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setActiveEvent(null);
  };

  const getPopoverContent = () => {
    switch (activeEvent?.type) {
      case ClinicalScheduleEventType.CustomEvent:
        return <CustomEventCard event={activeEvent} />;
      case ClinicalScheduleEventType.QuarterlyBloodTest:
        return <QuarterlyBloodTestCard event={activeEvent} />;
      case ClinicalScheduleEventType.NephrologistVisit:
      case ClinicalScheduleEventType.PICVisit:
        return <DoctorReviewEventCard event={activeEvent} />;
      default:
        return null;
    }
  };

  const editEvent = () => {
    activeEvent &&
      dispatch(
        addServiceModal({
          name: ServiceModalName.AddClinicalEventModal,
          payload: {
            date: parse(activeEvent.date, 'yyyy-MM-dd', new Date()),
            type: activeEvent.type,
            isAllDay: activeEvent.isAllDay,
            title: 'title' in activeEvent ? activeEvent.title : null,
            laboratory: 'lab' in activeEvent ? { value: activeEvent.lab.id, label: activeEvent.lab.name } : null,
            startTime: parse(activeEvent.startTime, 'HH:mm:ss', new Date()),
            endTime: parse(activeEvent.endTime, 'HH:mm:ss', new Date()),
            comment: activeEvent.comment,
            id: activeEvent.id,
            doctor: 'doctor' in activeEvent ? { value: activeEvent.doctor.id, label: activeEvent.doctor.name } : null,
            targetAudience: 'targetAudience' in activeEvent ? activeEvent.targetAudience : null,
            dialysisRelated: 'dialysisRelated' in activeEvent ? activeEvent.dialysisRelated : null,
          },
        }),
      );

    handlePopoverClose();
    onClose();
  };

  const handlerDeleteEvent = () => {
    activeEvent &&
      dispatch(
        addServiceModal({
          name: ServiceModalName.ConfirmModal,
          payload: {
            closeCallback: () => {
              dispatch(deleteEvent(activeEvent.id));
              handlePopoverClose();
            },
            title: t('deleteEvent'),
            text: t('allServicesWillBeDeleted'),
            confirmButton: tCommon('button.delete'),
            cancelButton: tCommon('button.cancel'),
          },
        }),
      );
  };

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        {...getPopoverPosition(anchorEl, POPUP_WIDTH)}
        sx={getPopoverStyle(anchorEl, POPUP_WIDTH)}
      >
        <Box sx={{ p: 2, width: `${POPUP_WIDTH - 16}px` }}>
          <Stack justifyContent="end" direction="row" spacing={2} sx={{ mb: 2 }}>
            {isFuture && (
              <>
                <PermissionGuard permissions={[UserPermissions.ClinicalScheduleSuitModify]}>
                  <IconButton onClick={editEvent} sx={{ m: 0, p: 0 }} data-testid="editEventButton">
                    <EditIcon />
                  </IconButton>
                </PermissionGuard>
                <PermissionGuard permissions={[UserPermissions.ClinicalScheduleSuitModify]}>
                  <IconButton onClick={handlerDeleteEvent} sx={{ m: 0, p: 0 }} data-testid="deleteEventButton">
                    <DeleteOutlineIcon />
                  </IconButton>
                </PermissionGuard>
              </>
            )}
            <IconButton
              onClick={handlePopoverClose}
              sx={{
                m: 0,
                p: 0,
              }}
              data-testid="closeModalButton"
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          {getPopoverContent()}
        </Box>
      </Popover>
      {events.map((event: ClinicalEvent, index) => {
        return (
          <Stack
            key={event.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            sx={[
              ({ spacing, palette }) => ({
                padding: spacing(0.75),
                backgroundColor: palette.primary.light,
                borderLeft: `3px solid ${palette.primary.main}`,
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '1px',
              }),
            ]}
            onClick={() => onEventClick(index, event)}
            ref={(el: HTMLDivElement) => (eventCardRefs.current[index] = el)}
          >
            <Typography
              variant="labelM"
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {getEventTypeTitle(event)}
            </Typography>
            <Box
              sx={({ spacing, palette }) => ({
                minWidth: '16px',
                height: '16px',
                lineHeight: '16px',
                borderRadius: '8px',
                backgroundColor: getEventTypeColor(event.type),
                color: palette.text.white,
                fontSize: '11px',
                fontWeight: 500,
                paddingLeft: spacing(0.5),
                paddingRight: spacing(0.5),
              })}
            >
              {getEventTypeLabel(event.type)}
            </Box>
          </Stack>
        );
      })}
    </>
  );
};
