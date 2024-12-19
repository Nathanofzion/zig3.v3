import { useContext } from 'react';
import { Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppContext } from 'contexts';
import ModalBox from './ModalBox';
import { SorobanContextType, useSorobanReact } from '@soroban-react/core';

export default function RewardsModal() {
  const theme = useTheme();
  const { RewardsModal } = useContext(AppContext);
  const { isRewardsModalOpen, setRewardsModalOpen } = RewardsModal;
  const sorobanContext: SorobanContextType = useSorobanReact();
  const { activeChain, chains, activeConnector, address } = sorobanContext;

  return (
    <Modal
      open={isRewardsModalOpen}
      onClose={() => {
        setRewardsModalOpen(false);
      }}
    >
      <div>
        <ModalBox>
            <div>
              {activeChain && chains && activeConnector?.id == 'xbull' && address ?
                <>
                  <div>
                    {address}
                  </div>
                </>
                :
                <>
                  <div>
                    plz connect wallet
                  </div>
                </>
              }
            </div>
        </ModalBox>
      </div>
    </Modal>
  );
}
