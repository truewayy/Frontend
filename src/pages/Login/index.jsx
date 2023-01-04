import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../api/Auth';
import { CssTextField } from '../../components/CssTextField';
import Meta from '../../components/Meta';
import * as Styled from './styled';

const Login = () => {
  const navigate = useNavigate();
  const auth = Auth();
  const [checked, setChecked] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassWord] = useState();

  const [db, setData] = useState({
    data: [],
  });

  const [loading, setLoading] = useState(false);

  const onChangeCheckBox = (event) => {
    setChecked(event.target.checked);
  };
  const onChangeID = (e) => {
    setUserName(e.target.value);
  };
  const onChangePW = (e) => {
    setPassWord(e.target.value);
  };
  const onLogin = () => {
    checked
      ? auth.login(setData, setLoading, username, password)
      : auth.unCheckedLogin(setData, setLoading, username, password);
  };

  const onKeypress = (e) => {
    if (e.key === 'Enter') {
      checked
        ? auth.login(setData, setLoading, username, password)
        : auth.unCheckedLogin(setData, setLoading, username, password);
    }
  };

  useEffect(() => {
    if (loading && db !== null) {
      navigate(-1) || navigate('/myinformation');
    }
  }, [db, loading, navigate]);

  return (
    <Styled.Container>
      <Meta
        title="SUWIKI : 로그인"
        description="SUWIKI에 로그인 하고 수원대학교 강의평가의 모든 서비스를 이용해 보세요"
      />
      <picture>
        <source srcSet="/images/signup.avif" type="image/avif" />
        <source srcSet="/images/signup.webp" type="image/webp" />
        <source srcSet="/images/signup.png" type="image/png" />
        <Styled.Img src="images/signup.svg" alt="signup" width={400} height={350} />
      </picture>
      <Styled.LoginWrapper>
        <Styled.Title>로그인</Styled.Title>
        <CssTextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="아이디"
          name="email"
          autoComplete="email"
          onChange={onChangeID}
          onKeyPress={onKeypress}
        />
        <CssTextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="비밀번호"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={onChangePW}
          onKeyPress={onKeypress}
        />
        <Styled.SearchWrapper>
          <FormControlLabel
            control={<Checkbox checked={checked} color="primary" onChange={onChangeCheckBox} />}
            label="로그인 유지"
          />
          <div>
            <Styled.SearchButton onClick={() => navigate('/idsearch')}>
              아이디 찾기
            </Styled.SearchButton>
            <Styled.SearchButton onClick={() => navigate('/pwsearch')}>
              비밀번호 찾기
            </Styled.SearchButton>
          </div>
        </Styled.SearchWrapper>
        <Styled.Button
          background="#336af8"
          type="submit"
          fullWidth
          variant="contained"
          onClick={onLogin}
        >
          로그인
        </Styled.Button>
      </Styled.LoginWrapper>
    </Styled.Container>
  );
};

export default Login;
