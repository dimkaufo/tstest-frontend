import * as React from "react";
import styled from "styled-components";

// components
import Header from "components/parts/Header";
import Sidebar from "components/parts/Sidebar";

// Types
import {User} from "store/users/types";

const Container = styled.div`
   display: flex;
   flex-direction: column;
   padding: 0 20px;
   height: 100%;
`;

const SidebarWithContent = styled.div`
   display: flex;
   height: 100%;
`;

const SidebarStyled = styled(Sidebar)`
   flex: 0 1 200px;
`;

const PageContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   border-radius: 10px;
   box-shadow: 1px 1px 14px -5px rgba(0,0,0,0.2);
`;

const Title = styled.div`
   display: flex;
   align-items: center;
   padding: 0 40px;
   background-color: #fce094;
   height: 100px;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
   font-size: 14pt;
   font-weight: bold;
`;

const PageContent = styled.div`
   padding: 10px 40px 0 40px;
   height: 100%;
   border-left: 1px solid #fce094;
   border-right: 1px solid #fce094;
`

type Props = Readonly<{
    className?: string
    currentUser: User | null,
    children?: JSX.Element | JSX.Element[] | string,
    title: string
}>

const PageContainer: React.FC<Props> = ({title, currentUser, children}: Props): JSX.Element => {
    return (
        <Container>
            <Header
                currentUser={currentUser}
            />
            <SidebarWithContent>
                <SidebarStyled />
                <PageContentContainer>
                    <Title>
                        {title}
                    </Title>
                    <PageContent>
                        {children}
                    </PageContent>
                </PageContentContainer>
            </SidebarWithContent>
        </Container>
    );
}

export default PageContainer;