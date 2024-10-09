import React, { useEffect } from 'react';
import { Dialog } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import WomanAvatar from '/assets/images/avatar/avatar-27.png';
import PoliceAvatar from '/assets/images/avatar/avatar-26.png';
import { UserTypes } from 'src/_mock';

interface ModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  setUserType: (userType: UserTypes) => void;
}

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

function UserTypeModal({ openModal, handleCloseModal, setUserType }: ModalProps) {
  return (
    <Dialog
      open={openModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModal}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="flex flex-col gap-y-4 px-4 py-6">
        <h1 className="text-2xl sm:text-3xl text-center font-bold">Are you?</h1>
        <div className="flex flex-row gap-x-6">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() => setUserType(UserTypes.woman)}
          >
            <Box
              component="img"
              className="h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40"
              alt={UserTypes.woman}
              src={WomanAvatar}
            />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() => setUserType(UserTypes.police)}
          >
            <Box
              component="img"
              className="h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40"
              alt={UserTypes.police}
              src={PoliceAvatar}
            />
          </IconButton>
        </div>
      </div>
    </Dialog>
  );
}

export default React.memo(UserTypeModal);
