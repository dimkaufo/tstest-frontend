import * as React from "react";
import styled, {keyframes} from "styled-components";

// assets
import LoadingIcon from "app-assets/svg/loading.svg?inline";

const SpinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingIconStyled = styled(LoadingIcon)`
   animation: ${SpinAnimation} 1s infinite linear;
   width: 30px;
   height: 30px;
`

const LoadingSpinner: React.FC = (): JSX.Element => {
    return (
        <LoadingIconStyled />
    );
}

export default LoadingSpinner;