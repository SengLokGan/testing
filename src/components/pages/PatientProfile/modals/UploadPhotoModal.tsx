import { Dispatch, SetStateAction, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AvatarEditor from 'react-avatar-editor';
import heic2any from 'heic2any';
import { AxiosResponse } from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import isEmpty from 'lodash/isEmpty';
import { InfoModal, InfoModalProps } from '@components';
import { TempPhotoResponse, WithSx } from '@types';
import { StyledStartIconButton } from './Modal.styles';
import emptyPatientIcon from '@assets/emptyPatient.svg';
import { API, convertSxToArray } from '@utils';
import { CurrentPhotoState, useSnack } from '@hooks';
import { captureSize } from '@constants';
import { useMediaQuery } from '@mui/material';
import { SnackType } from '@enums';
import Slider from '@mui/material/Slider';

export type UploadPhotoModalProps = WithSx<{
  step: UploadPhotoModalStep;
  currentPhoto?: string | null;
  setCurrentPhoto: Dispatch<SetStateAction<CurrentPhotoState>>;
  changePhotoUrl?: string;
}> &
  Omit<InfoModalProps, 'title' | 'children' | 'onBackButtonClick'>;

export enum UploadPhotoModalStep {
  AddPhoto,
  ChangePhoto,
  DeletePhoto,
  ProcessingPhoto,
}

export const UploadPhotoModal = ({
  step,
  currentPhoto,
  setCurrentPhoto,
  onClose,
  isOpen,
  changePhotoUrl = '/pm/patients/photo',
  sx = [],
}: UploadPhotoModalProps) => {
  const { t } = useTranslation('patient');
  const { t: tCommon } = useTranslation('common');
  const [currentStep, setCurrentStep] = useState(UploadPhotoModalStep.ChangePhoto);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extension, setExtension] = useState('');
  const [photoDegree, setPhotoDegree] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [checkCameraPermission, setCheckCameraPermission] = useState(true);
  const isSmallHeight = useMediaQuery('(max-height: 500px)');
  let editor = useRef<typeof AvatarEditor | null>(null);
  const { displaySnack } = useSnack();
  const [zoom, setZoom] = useState(1);

  const handleClickBackButton = () => {
    handleReset();
    handleTurnOffCamera();
    if (currentStep === UploadPhotoModalStep.DeletePhoto) setCurrentStep(UploadPhotoModalStep.ChangePhoto);
    else {
      setCurrentStep(UploadPhotoModalStep.AddPhoto);
    }
  };

  const handleTurnOffCamera = () => {
    const videoRef = localVideoRef.current;
    if (videoRef) {
      const stream = videoRef.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
      const lastDot = file.name.lastIndexOf('.');
      setExtension(file.name.substring(lastDot + 1));
      setUploadedImage(URL.createObjectURL(file));
      setCurrentStep(UploadPhotoModalStep.ProcessingPhoto);
      setErrorText(false);
    } else if (file.type === 'image/heif' || file.type === 'image/heic') {
      heic2any({
        blob: file,
        toType: 'image/jpg',
        quality: 0.5,
      }).then((updatedFile) => {
        setExtension('jpg');
        setUploadedImage(URL.createObjectURL(updatedFile as File));
        setCurrentStep(UploadPhotoModalStep.ProcessingPhoto);
        setErrorText(false);
      });
    } else {
      setErrorText(true);
    }
    handleTurnOffCamera();
    e.target.value = '';
  };

  const handleDeletePhoto = () => {
    setCurrentPhoto((prevState) => ({
      ...prevState,
      localPhotoPath: null,
      photoPath: '',
    }));
    onClose();
  };

  const handleRotatePhoto = () => {
    setPhotoDegree((prevState) => (prevState + 90 >= 360 ? 0 : prevState + 90));
  };

  const handleReset = () => {
    setPhotoDegree(0);
    setZoom(1);
  };

  const renderImage = () => {
    const canvas = localCanvasRef.current;
    const video = localVideoRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const captureWidth = captureSize.width;
    const captureHeight = captureSize.height;
    const captureAspectRatio = captureWidth / captureHeight;

    const avatarSize = 250;
    const avatarAspectRatio = 1;

    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = captureWidth;
    let sourceHeight = captureHeight;

    if (captureAspectRatio > avatarAspectRatio) {
      sourceWidth = Math.round(captureHeight * avatarAspectRatio);
      sourceX = Math.round((captureWidth - sourceWidth) / 2);
    } else {
      sourceHeight = Math.round(captureWidth / avatarAspectRatio);
      sourceY = Math.round((captureHeight - sourceHeight) / 2);
    }

    const destWidth = avatarSize;
    const destHeight = avatarSize;

    canvas.width = destWidth;
    canvas.height = destHeight;

    ctx.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, destWidth, destHeight);
  };

  const handleTakePhoto = () => {
    renderImage();
    const currentImage = localCanvasRef?.current?.toDataURL('image/png');
    if (currentImage) {
      setUploadedImage(currentImage);
      setCurrentStep(UploadPhotoModalStep.ProcessingPhoto);
      setErrorText(false);
    }
    handleTurnOffCamera();
  };

  const handeSaveImage = async () => {
    setIsLoading(true);
    if (editor?.current) {
      const canvasScaled = editor.current.getImageScaledToCanvas();
      canvasScaled.toBlob(function (blob) {
        const formData = new FormData();
        formData.append('file', blob, `filename.${extension}`);
        API.post(changePhotoUrl, formData)
          .then(({ data }: AxiosResponse<TempPhotoResponse>) => {
            const croppedImg = canvasScaled.toDataURL();
            setCurrentPhoto((prevState) => ({
              ...prevState,
              localPhotoPath: croppedImg,
              photoPath: data.photoPath,
            }));
            setIsLoading(false);
            handleReset();
            onClose();
          })
          .catch((error) => {
            displaySnack({ type: SnackType.Error, message: error.message, timeout: 5000 });
            setIsLoading(false);
          });
      });
    }
  };

  const getUserMedia = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return navigator.mediaDevices
        .getUserMedia(captureSize.captureOption)
        .then((stream) => {
          localVideoRef.current && (localVideoRef.current.srcObject = stream);
        })
        .catch(() => {
          setCheckCameraPermission(false);
        });
    }
  };

  const handleZoomChange = (event) => {
    setZoom(parseFloat(event.target.value));
  };

  useLayoutEffect(() => {
    setCurrentStep(step);
    return () => {
      handleTurnOffCamera();
    };
  }, [step]);

  const getContent = () => {
    currentStep === UploadPhotoModalStep.AddPhoto && getUserMedia();
    const avatar =
      currentStep === UploadPhotoModalStep.AddPhoto && checkCameraPermission ? (
        <div
          className="camera"
          data-testid={'openCameraContainer'}
          style={{
            padding: 0,
            textAlign: 'center',
            width: captureSize.width,
            height: captureSize.height,
            overflow: 'hidden',
          }}
        >
          <video width="100%" ref={localVideoRef} autoPlay loop />
          <canvas width="100%" ref={localCanvasRef} style={{ display: 'none' }} />
        </div>
      ) : (
        <Avatar
          sx={(theme) => ({
            width: theme.spacing(30),
            height: theme.spacing(30),
            bgcolor: theme.palette.primary[90],
          })}
          alt="big avatar"
          src={currentPhoto ? currentPhoto : emptyPatientIcon}
          data-testid={'openAvatarContainer'}
        />
      );

    switch (currentStep) {
      case UploadPhotoModalStep.AddPhoto:
        return <Box sx={{ py: checkCameraPermission ? 0 : 3 }}>{avatar}</Box>;
      case UploadPhotoModalStep.ChangePhoto:
        return <Box sx={{ py: 3 }}>{avatar}</Box>;
      case UploadPhotoModalStep.DeletePhoto:
        return (
          <Stack direction="column" spacing={2} sx={{ py: 3, alignItems: 'center' }}>
            {avatar}
            <Typography variant="headerM">{t('profile.wantToDelete')}</Typography>
          </Stack>
        );
      case UploadPhotoModalStep.ProcessingPhoto:
        return (
          <Box>
            {uploadedImage && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AvatarEditor
                  ref={editor}
                  image={uploadedImage}
                  width={250}
                  height={250}
                  border={50}
                  rotate={photoDegree}
                  crossOrigin="use-credentials"
                  borderRadius={125}
                  scale={zoom}
                />
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Typography variant="labelM">Zoom:</Typography>
                  <Slider onChange={handleZoomChange} value={zoom} min={1} max={2} step={0.01} />
                  <Typography variant="labelM">{zoom.toFixed(2) + 'x'}</Typography>
                </div>
              </div>
            )}
          </Box>
        );
    }
  };

  const getActionButtons = () => {
    let leftButtonProps = {};
    let rightButtonProps = {};
    switch (currentStep) {
      case UploadPhotoModalStep.AddPhoto:
        leftButtonProps = {
          variant: 'outlined',
          startIcon: <UploadFileOutlinedIcon />,
          children: tCommon('button.upload'),
          onClick: () => inputRef.current?.click(),
          'data-testid': 'uploadPhotoButton',
        };
        if (checkCameraPermission) {
          rightButtonProps = {
            variant: 'outlined',
            startIcon: <CameraAltOutlinedIcon />,
            children: tCommon('button.takePhoto'),
            onClick: handleTakePhoto,
            'data-testid': 'takePhotoButton',
          };
        }
        break;
      case UploadPhotoModalStep.ChangePhoto:
        leftButtonProps = {
          variant: 'outlined',
          startIcon: <EditOutlinedIcon />,
          children: tCommon('button.change'),
          onClick: () => setCurrentStep(UploadPhotoModalStep.AddPhoto),
          'data-testid': 'changePhotoButton',
        };
        rightButtonProps = {
          variant: 'outlined',
          startIcon: <DeleteOutlineOutlinedIcon />,
          children: tCommon('button.delete'),
          onClick: () => setCurrentStep(UploadPhotoModalStep.DeletePhoto),
          'data-testid': 'deletePhotoButton',
        };
        break;
      case UploadPhotoModalStep.DeletePhoto:
        leftButtonProps = {
          variant: 'outlined',
          children: tCommon('button.cancel'),
          onClick: () => setCurrentStep(UploadPhotoModalStep.ChangePhoto),
          'data-testid': 'cancelDeletePhotoButton',
        };
        rightButtonProps = {
          variant: 'contained',
          children: tCommon('button.delete'),
          onClick: handleDeletePhoto,
          'data-testid': 'confirmDeletePhotoButton',
        };
        break;
      case UploadPhotoModalStep.ProcessingPhoto:
        leftButtonProps = {
          variant: 'text',
          startIcon: <Rotate90DegreesCwOutlinedIcon />,
          children: tCommon('button.rotate'),
          onClick: handleRotatePhoto,
          'data-testid': 'rotatePhotoButton',
        };
        rightButtonProps = {
          variant: 'contained',
          disabled: isLoading,
          children: [
            tCommon('button.save'),
            isLoading && (
              <CircularProgress
                key="CircularProgress"
                size="20px"
                color="inherit"
                sx={{ ml: 1 }}
                data-testid="progressbar"
              />
            ),
          ],
          onClick: handeSaveImage,
          'data-testid': 'savePhotoButton',
        };
        break;
    }
    return (
      <>
        <StyledStartIconButton {...leftButtonProps} fullWidth />
        {!isEmpty(rightButtonProps) && <StyledStartIconButton {...rightButtonProps} fullWidth />}
      </>
    );
  };

  return (
    <InfoModal
      isOpen={isOpen}
      onClose={onClose}
      sx={[
        isSmallHeight && {
          zoom: '80%',
        },
        ...convertSxToArray(sx),
      ]}
      title={t(
        currentStep === UploadPhotoModalStep.ProcessingPhoto ? 'profile.croppingAndRotating' : 'profile.profilePhoto',
      )}
      onBackButtonClick={
        currentStep !== UploadPhotoModalStep.AddPhoto && currentStep !== UploadPhotoModalStep.ChangePhoto
          ? handleClickBackButton
          : undefined
      }
    >
      <Input
        type="file"
        inputProps={{ accept: 'image/*', ref: inputRef, 'data-testid': 'UploadPhotoInput' }}
        sx={{ display: 'none' }}
        onChange={handleUploadPhoto}
      />
      <Stack direction="column">
        <Box
          sx={(theme) => ({
            width: theme.spacing(50),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          {getContent()}
        </Box>
        <Stack direction="row" spacing={2} sx={{ p: 3 }}>
          {getActionButtons()}
        </Stack>
        {errorText && (
          <Typography variant="labelL" color="error" textAlign="center" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
            {t('profile.wrongFileType')}
          </Typography>
        )}
      </Stack>
    </InfoModal>
  );
};
