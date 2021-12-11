const { styled } = window;
const theme = {
  main: "#fd5750",
  mainDark: "#e34e48",
  blackLight: "#121212",
  grey: "#7c7c7c",
  greyDark: "#262626",
  success: "#389e0d",
  spinnerBorderWidth: "3.3px",
};
const GlobalStyle = styled.createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #000000;
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  #root {
    width: 100%;
    margin: auto;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  input,
  label {
    color: #fff;
    font-family: Montserrat, SanFrancisco, Helvetica, Ariel, sans-serif;
    font-style: normal;
    font-weight: bold;
  }
`;

const AppWrapper = styled.div`
  padding: 7vw;
  position: relative;
`;
const CloudDotsWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 350px;
  z-index: -1;
  display: flex;
  justify-content: space-between;
  width: 100%;
  img:nth-child(2) {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
`;
const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;
const Container = styled.div`
  width: 90%;
  margin: auto;
`;
const Input = styled.input`
  background: ${theme.greyDark};
  color: rgb(222, 222, 222);
  font-size: 14px;
  font-weight: normal;
  outline: none;
  border: none;

  padding: 15px 25px;
  border-radius: 6px;
`;
const MainTitle = styled.h1`
  font-size: 5rem;
`;
const Subtitle = styled.h2`
  color: ${theme.grey};
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Label = styled.label`
  color: ${theme.grey};
  margin-bottom: 10px;
  margin-left: 3px;
  font-size: 14px;
  font-weight: 400;
`;
const LoginWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 400px;
  /* height: 180px; */
  justify-content: space-between;
  margin: auto;
`;

const Button = styled.button`
  border: 1px solid ${theme.main};
  border-radius: 6px;
  padding: 14px 26px;
  background-color: #000;
  color: ${theme.main};
  font-weight: bold;
  max-height: 48px;
  cursor: pointer;
  transition: "all 300ms ease-in-out";
  path {
    stroke: ${theme.main};
  }
  &.grey {
    border-color: ${theme.greyDark};
    background-color: ${theme.greyDark};
    color: #fff;
    path {
      stroke: #fff;
    }
    &:hover {
      border-color: #fff;
    }
  }
  &.white {
    border-color: #fff;
    color: #fff;
  }
  &.primary {
    background-color: ${theme.main};
    color: #fff;
  }
  &.success {
    border-color: ${theme.success};
    background-color: ${theme.success};
    color: #fff;
    path {
      stroke: #fff;
    }
  }
  &:not(.success).primary:hover {
    background-color: ${theme.mainDark};
    color: #fff;
  }
  &:not(.success):not(.primary):not(.grey):hover {
    border-color: ${theme.mainDark};
    color: ${theme.mainDark};

    path {
      stroke: ${theme.mainDark};
    }
  }
`;
const LogoutWrapper = styled.div`
  margin: 50px auto;
  text-align: center;
`;
const ErrorMessage = styled.h5`
  color: ${theme.main};
  min-height: 16px;
`;
const Spinner = styled.div`
  width: ${({ small }) => (small ? "10px" : "20px")};
  height: ${({ small }) => (small ? "10px" : "20px")};
  margin: auto;
  border: ${theme.spinnerBorderWidth} solid
    ${({ primary }) => (primary ? "#fff" : theme.main)};
  border-radius: 50%;
  border-top: ${theme.spinnerBorderWidth} solid
    ${({ primary }) => (primary ? theme.main : "#000")};

  -webkit-animation: spin 1s linear infinite;

  animation: spin 1s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
const ListWrapper = styled.div`
  min-height: 100vh;
`;
const FloatingEdit = styled.div`
  position: absolute;
  left: -100px;
  top: 0;
  transition: all 500ms ease-in-out;
  display: ${({ show }) => (show ? "block" : "none")};
`;
const ListRow = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${({ isNew }) =>
    isNew
      ? "auto min-content 150px 100px"
      : "270px min-content 150px min-content auto 100px 100px"};
  gap: 15px;
  margin-bottom: 20px;

  h3 {
    color: ${theme.grey};
    margin: auto 0;
    font-weight: 100;
  }
`;
const Divider = styled.div`
  border: 1px solid ${theme.blackLight};
  margin: 45px 0;
`;
