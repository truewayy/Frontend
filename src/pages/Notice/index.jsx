import * as Styled from './styled';
import { useNavigate } from 'react-router-dom';
import { noticeApi } from '../../api/Api';
import { useInfiniteQuery } from 'react-query';
import Spinner from '../../components/Spinner';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export const NoticeItem = ({ notice }) => {
  const navigate = useNavigate();
  const onClick = () => navigate(`/notice/detail?id=${notice.id}`);

  return (
    <Styled.NoticeWrap onClick={onClick}>
      <Styled.Title>{notice.title}</Styled.Title>
      <Styled.Option>{notice.modifiedDate.slice(0, 10)}</Styled.Option>
    </Styled.NoticeWrap>
  );
};

export const NoticeContainer = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['notice'],
    ({ pageParam = 1 }) => noticeApi(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) return lastPage.nextPage;
        return undefined;
      },
    }
  );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  if (isLoading) return <Spinner id="notice" />;

  return (
    <>
      {data.pages.map((page) =>
        page.data.data.map((notice) => <NoticeItem notice={notice} key={notice.id} />)
      )}
      <div ref={ref} style={{ marginBottom: '10px' }}>
        {isFetchingNextPage ? <Spinner /> : null}
      </div>
    </>
  );
};

const Notice = () => {
  return (
    <Styled.AppContainer>
      <Styled.AppTitle>공지사항</Styled.AppTitle>
      <NoticeContainer />
    </Styled.AppContainer>
  );
};

export default Notice;
