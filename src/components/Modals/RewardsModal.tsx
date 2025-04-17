import { useRouter } from 'next/navigation'
import { useContext } from 'react';
import { Modal, Button, Chip} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { AppContext } from 'contexts';
import ModalBox from './ModalBox';
import { SorobanContextType, useSorobanReact } from '@soroban-react/core';

const Title = styled('div')`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;

const Text = styled('div')`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  textwrap: wrap;
  & > span {
    display: block;
  }
`;

export default function RewardsModal() {
  const theme = useTheme();
  const router = useRouter();
  const { RewardsModal } = useContext(AppContext);
  const { isRewardsModalOpen, setRewardsModalOpen } = RewardsModal;
  const sorobanContext: SorobanContextType = useSorobanReact();
  const { activeChain, chains, activeConnector, address } = sorobanContext;

  const signUpButtonStyle = {
    display: 'flex',
    flexDirection: 'row',
    height: "100%",
    padding: '8px 40px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0.5,
    cursor: 'pointer',
    flexShrink: 0,
    fontWeight: 600,
    textTransform: 'unset',
    borderRadius: '16px',
    backgroundColor: '#00615F',
    '&[aria-controls="menu-list-grow"], &:hover': {
      color: theme.palette.primary.light,
      '& svg': {
        stroke: theme.palette.primary.light,
      },
    },
    '& .MuiChip-label': {
      color: '#FFFFFF',
      fontSize:20,
      fontFamily: 'Inter',
      fontWeight: 600,
      lineHeight: '140%',
      padding: 0
    },
    ':hover': {
      backgroundColor: '#00615F',
    },
    '.MuiChip-action-icon': {
      position: 'relative',
      top: '5px',
      left: '5px'
    }
  }

  return (
    <Modal
      open={isRewardsModalOpen}
      onClose={() => {
        setRewardsModalOpen(false);
      }}
    >
      <div>
        <ModalBox>
            <div style={{maxWidth: '400px'}}>
              {activeChain && chains && activeConnector?.id == 'xbull' && address ?
                <>
                  <div>
                    <Title>Referral Rewards</Title>
                                       <Text>
                      We will be Rewards <br></br> 10 Zi for everyone that <br></br> signs up
                    </Text>
                    <Text>
                      100 Zi extra for every <br></br> 10 people that sign up <br></br> with your link.
                    </Text>
                    <Text>
                      {`${address.slice(0, 6)}...${address.slice(-5)}`}
                    </Text>
                    <Text>
                      Terms & Conditions apply
                    </Text>                    
                  </div>
                </>
                :
                <>
                  <div>
                    <Title>Referral Rewards</Title>
                    <Text>
                      Sign up and share your magic link with your friends and family, and x.com, Facebook, WhatsApp.
                    </Text>
                    <Text>
                      We will be Rewards <br></br> 10 Zi for everyone that <br></br> signs up
                    </Text>
                    <Text>
                      100 Zi extra for every <br></br> 10 people that sign up <br></br> with your link.
                    </Text>
                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                      <Button
                        onClick={() => router.push('/login')}
                        sx={signUpButtonStyle}
                      >
                        Sign Up
                      </Button>
                    </div>
                    <Text>
                      Terms & Conditions apply
                    </Text>
                  </div>
                </>
              }
            </div>
        </ModalBox>
      </div>
    </Modal>
  );
}
