import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { evaluatePostApi, deleteEvaluateApi } from '../../api/Api';
import * as Styled from './myevaluation.element';
import StarRatings from 'react-star-ratings';
import EditEvaluation from '../../components/EditEvaluation';
import Loader from '../../components/Loader';
import ModalStyle from '../../components/ModalStyle';

export const DetailModal = (props) => {
  const teamSet = props.team;
  const homeworkSet = props.homework;
  const difficultySet = props.difficulty;
  const team = {
    0: <Styled.DataColor>없음</Styled.DataColor>,
    1: <Styled.DataColor id="purple">있음</Styled.DataColor>,
  };
  const homework = {
    0: <Styled.DataColor>없음</Styled.DataColor>,
    1: <Styled.DataColor id="cyan">보통</Styled.DataColor>,
    2: <Styled.DataColor id="purple">많음</Styled.DataColor>,
  };
  const difficulty = {
    0: <Styled.DataColor id="purple">까다로움</Styled.DataColor>,
    1: <Styled.DataColor id="cyan">보통</Styled.DataColor>,
    2: <Styled.DataColor>너그러움</Styled.DataColor>,
  };

  return (
    <div>
      <Styled.StarFlex id="top">
        <Styled.FlexContainer id="col">
          <Styled.StarFlex id="between">
            만족도
            <Styled.PaddingRight />
            <Styled.Rate id="modal">{props.satisfaction.toFixed(1)}</Styled.Rate>
          </Styled.StarFlex>
          <Styled.StarFlex id="between">조모임 {team[teamSet]}</Styled.StarFlex>
        </Styled.FlexContainer>
        <Styled.FlexContainer id="col">
          <Styled.StarFlex id="between">
            꿀강 지수
            <Styled.PaddingRight />
            <Styled.Rate id="modal">{props.honey.toFixed(1)}</Styled.Rate>
          </Styled.StarFlex>
          <Styled.StarFlex id="between">과제 {homework[homeworkSet]}</Styled.StarFlex>
        </Styled.FlexContainer>
        <Styled.FlexContainer id="col">
          <Styled.StarFlex id="between">
            배움 지수
            <Styled.PaddingRight />
            <Styled.Rate id="modal">{props.learning.toFixed(1)}</Styled.Rate>
          </Styled.StarFlex>
          <Styled.StarFlex id="between">학점 {difficulty[difficultySet]}</Styled.StarFlex>
        </Styled.FlexContainer>
      </Styled.StarFlex>
    </div>
  );
};

const Myevaluation = () => {
  const [db, setData] = useState({
    data: [],
  });
  const [target, setTarget] = useState(null);
  const [page, setPage] = useState(1);

  const [itemLists, setItemLists] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await evaluatePostApi(page).then((data) => setData(data));
    setItemLists(itemLists.concat(db.data));

    setIsLoaded(false);
  };

  useEffect(() => {
    console.log('page ? ', page);
    getMoreItem();
  }, [page]);

  const onIntersect = async (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
        setPage((prev) => prev + 1);
        // 현재 타겟을 unobserve한다.
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [itemLists]);

  return (
    <Styled.Wrapper>
      {itemLists.map((v, i) => {
        return (
          <Subject
            key={v.id}
            lectureName={v.lectureName}
            professor={v.professor}
            majorType={v.majorType}
            selectedSemester={v.selectedSemester}
            totalAvg={v.totalAvg}
            content={v.content}
            satisfaction={v.satisfaction}
            learning={v.learning}
            honey={v.honey}
            team={v.team}
            difficulty={v.difficulty}
            homework={v.homework}
            semesterList={v.semesterList}
            id={v.id}
          />
        );
      })}
      <div ref={setTarget} className="Target-Element">
        {isLoaded && <Loader />}
      </div>
    </Styled.Wrapper>
  );
};

export const Subject = (props) => {
  const [modal, setModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let title = props.lectureName;

  if (title.length >= 14) {
    title = props.lectureName.substr(0, 14) + '...';
  }
  const onDelete = () => {
    if (window.confirm('강의평가를 삭제하시겠습니까?') === true) {
      deleteEvaluateApi(props.id);
    } else {
      return;
    }
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <Styled.LectureWrapper>
        <Styled.MarginTop id="top">
          <Styled.MobileWrapper id="top">
            <Styled.YearText>{props.selectedSemester}</Styled.YearText>
            <div>
              <Styled.DeleteButton
                onClick={() => {
                  onDelete();
                }}
              >
                삭제
              </Styled.DeleteButton>
              <Styled.EditButton onClick={() => setModalIsOpen(true)}>수정</Styled.EditButton>
            </div>
          </Styled.MobileWrapper>
          <Styled.MobileWrapper>
            <Styled.Title>{title}</Styled.Title>
            <Styled.Major>{props.majorType}</Styled.Major>
            <Styled.Major id="border">|</Styled.Major>
            <Styled.Professor>{props.professor}</Styled.Professor>
          </Styled.MobileWrapper>

          <Styled.TitleWrapper>
            <Styled.YearText>{props.selectedSemester}</Styled.YearText>
            <Styled.Title>{title}</Styled.Title>
            <Styled.Major>{props.majorType}</Styled.Major>
            <Styled.Major id="border">|</Styled.Major>
            <Styled.Professor>{props.professor}</Styled.Professor>
          </Styled.TitleWrapper>
          <Styled.DeleteButton
            id="pc"
            onClick={() => {
              onDelete();
            }}
          >
            삭제
          </Styled.DeleteButton>
          <Styled.EditButton id="pc" onClick={() => setModalIsOpen(true)}>
            수정
          </Styled.EditButton>

          <div style={{ marginBottom: '38px' }} />
          <StarRatings
            rating={props.totalAvg}
            starRatedColor="#346cfd"
            numberOfStars={5}
            name="rating"
            starDimension="18px"
            starSpacing="0px"
            svgIconPath="M17.563,21.56a1,1,0,0,1-.466-.115L12,18.765l-5.1,2.68a1,1,0,0,1-1.451-1.054l.974-5.676L2.3,10.7A1,1,0,0,1,2.856,8.99l5.7-.828L11.1,3A1.04,1.04,0,0,1,12.9,3l2.549,5.164,5.7.828A1,1,0,0,1,21.7,10.7l-4.124,4.02.974,5.676a1,1,0,0,1-.985,1.169Z"
            svgIconViewBox="0 0 24 24"
          />
          <Styled.Rate>{props.totalAvg.toFixed(1)}</Styled.Rate>
          <Styled.ModalOpen
            onClick={() => {
              setModal(!modal);
            }}
          >
            {modal === true ? '간략히' : '자세히'}
          </Styled.ModalOpen>
        </Styled.MarginTop>
        {modal === true ? (
          <DetailModal
            satisfaction={props.satisfaction}
            honey={props.honey}
            learning={props.learning}
            team={props.team}
            homework={props.homework}
            difficulty={props.difficulty}
          />
        ) : null}
        <Styled.MarginTop id="bottom">
          <Styled.EvaluationDetail>{props.content}</Styled.EvaluationDetail>
        </Styled.MarginTop>
        <Modal
          isOpen={modalIsOpen}
          style={ModalStyle}
          // 오버레이나 esc를 누르면 핸들러 동작
          ariaHideApp={false}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <EditEvaluation
            setModalIsOpen={setModalIsOpen}
            semester={props.selectedSemester}
            satisfaction={props.satisfaction}
            learning={props.learning}
            honey={props.honey}
            team={props.team}
            difficulty={props.difficulty}
            homework={props.homework}
            content={props.content}
            semesterList={props.semesterList}
            lectureName={props.lectureName}
            id={props.id}
          />
        </Modal>
      </Styled.LectureWrapper>
    </div>
  );
};

export default Myevaluation;
