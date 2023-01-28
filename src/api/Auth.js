import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { removeStorage, setStorage } from 'utils/loginStorage';
import { tokenState } from '../app/recoilStore';
import JwtInterceptors from './ApiController';
const PROXY_URL = window.location.hostname === 'localhost' ? '' : '/proxy';

const Auth = () => {
  const setToken = useSetRecoilState(tokenState);
  const instance = JwtInterceptors().instance;
  const navigate = useNavigate();

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cache: 'no-cache',
    'Access-Control-Allow-Origin': PROXY_URL,
  };

  //회원가입 api
  const register = async (id, pw, email) => {
    const data = {
      loginId: id,
      password: pw,
      email,
    };
    return instance({
      url: `user/join`,
      method: 'POST',
      data: data,
    }).catch((error) => {
      alert(error.response.data.message);
    });
  };

  //회원가입 아이디 중복확인
  const checkId = async (setData, id) => {
    const data = {
      loginId: id,
    };
    return instance({
      url: `user/check-id`,
      method: 'POST',
      data: data,
    })
      .then((r) => {
        setData(!r.overlap);
        if (!r.overlap) alert('사용가능합니다.');
        else alert('중복입니다.');
      })
      .catch(() => {
        alert('요청에 실패하였습니다.');
      });
  };

  //회원가입 이메일 중복확인
  const checkEmail = async (setData, email) => {
    const data = {
      email,
    };
    return instance({
      url: `user/check-email`,
      method: 'POST',
      data: data,
    })
      .then((r) => {
        setData(!r.overlap);
        if (!r.overlap) alert('사용가능합니다.');
        else alert('중복입니다.');
      })
      .catch(() => {
        alert('요청에 실패하였습니다.');
      });
  };

  //아이디 찾기api
  const findId = async (email) => {
    const data = {
      email,
    };
    return instance({
      url: `user/find-id`,
      method: 'POST',
      data: data,
    })
      .then(() => {
        alert('해당 이메일로 아이디를 전송하였습니다');
      })
      .catch(() => {
        alert('해당 아이디를 찾을 수 없습니다.');
      });
  };

  //비밀번호 찾기api
  const findPw = async (id, email) => {
    const data = {
      loginId: id,
      email,
    };
    return instance({
      url: `user/find-pw`,
      method: 'POST',
      data: data,
    })
      .then(() => {
        alert('해당 이메일로 임시 비밀번호를 발송하였습니다.');
      })
      .catch(() => {
        alert('해당 아이디.이메일을 찾을 수 없습니다.');
      });
  };

  //로그인api (로그인유지)
  const login = async (id, pw) => {
    const data = {
      loginId: id,
      password: pw,
    };
    return instance({
      url: `user/client-login`,
      method: 'POST',
      data,
      headers,
      withCredentials: true,
    })
      .then((r) => {
        setStorage('login', true);
        setToken(r.AccessToken);
        navigate('/');
      })
      .catch(() => {
        alert('id 또는 pw 확인해주세요');
      });
  };

  //SUWIKI 비밀번호 변경
  const resetPassword = async (prePassword, newPassword) => {
    const data = {
      prePassword,
      newPassword,
    };

    return instance({
      url: `/user/reset-pw`,
      method: 'POST',
      data: data,
    })
      .then((data) => {
        if (data.success) {
          alert('비밀번호가 변경되었습니다\n다시 로그인 해주세요');
          removeStorage('login');
          window.location.href = '/';
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  //SUWIKI 회원 탈퇴
  const quit = async (id, pw) => {
    const data = {
      loginId: id,
      password: pw,
    };

    return instance({
      url: `/user/quit`,
      method: 'POST',
      data: data,
    })
      .then(() => {
        removeStorage('login');
        window.location.href = '/';
      })
      .catch((error) => alert(error.response.data.message));
  };

  return {
    register,
    checkId,
    checkEmail,
    login,
    findId,
    findPw,
    resetPassword,
    quit,
  };
};
export default Auth;
