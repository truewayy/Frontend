import React, { useState, useEffect } from 'react';
import { examWriteApi } from '../../api/Api';
import * as Styled from './styled'
import {SemesterSelect, StyledOption, Soption} from '../../Pages/Main/styled'

const Edittestinfo = (props) => {
  const [semester, setSemester] = useState(''); //학기
  const [examType, setExamType] = useState(''); //중간,기말
  const [examDifficulty, setDifficulty] = useState(``); //난이도
  const [content, setContent] = useState(); //글쓰기
  const [exam, setExamInfo] = useState([]); //시험내용
  const examInfo = exam.join(', ');

  const difficultyChange = (e) => {
    setDifficulty(e.target.value);
  };
  const handleExam = (checked, value) => {
    if (checked) {
      setExamInfo([...exam, value]);
    } else {
      // 체크 해제
      setExamInfo(exam.filter((data) => data !== value));
    }
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onTest = () => {
    examWriteApi(props.selectId, props.lectureName, props.professor, semester, examInfo, examType, examDifficulty, content);
    props.setModalIsOpen(false);
  };

  const semesterOptions = ['선택','2021-1','2022-1'];
  const examTypeOptions = ['선택','중간고사','기말고사','쪽지','기타']

  return (
    <Styled.Wrapper>
      <Styled.TitleWrapper>
        <Styled.Title>{props.lectureName}</Styled.Title>
        <Styled.Title
          onClick={() => {
            props.setModalIsOpen(false);
          }}
        >
          X
        </Styled.Title>
      </Styled.TitleWrapper>

      <Styled.ContentWrapper>
        <Styled.Content id="group">
          <Styled.ContentTitle>수강학기</Styled.ContentTitle>
          <SemesterSelect id='semester' defaultValue={'선택'} onChange={(e)=>{setSemester(e)}}>
              {semesterOptions.map((index) => (
                <StyledOption id='semester' key={index} value={index}>
                  <Soption id='semester'>
                    {index}
                  </Soption>
                </StyledOption>
              ))}
            </SemesterSelect>
            <Styled.ContentTitle>시험종류</Styled.ContentTitle>
            <SemesterSelect id='semester' defaultValue={'선택'} onChange={(e)=>{setExamType(e)}}>
              {examTypeOptions.map((index) => (
                <StyledOption id='semester' key={index} value={index}>
                  <Soption id='semester'>
                    {index}
                  </Soption>
                </StyledOption>
              ))}
            </SemesterSelect>
        </Styled.Content>

        <Styled.Content onChange={difficultyChange}>
          <Styled.ContentTitle>난이도</Styled.ContentTitle>
          <Styled.FormLabel>
          <Styled.FormCheckLeft name="examDifficulty" id="easy" value="쉬움" />
          <Styled.FormCheckText>쉬움</Styled.FormCheckText>
        </Styled.FormLabel>
        <Styled.FormLabel>
          <Styled.FormCheckLeft name="examDifficulty" id="normal" value="보통" />
          <Styled.FormCheckText>보통</Styled.FormCheckText>
        </Styled.FormLabel>
        <Styled.FormLabel>
          <Styled.FormCheckLeft name="examDifficulty" id="difficult" value="어려움" />
          <Styled.FormCheckText>어려움</Styled.FormCheckText>
        </Styled.FormLabel>
        </Styled.Content>

        <Styled.Content onChange={(e)=>handleExam(e.target.checked, e.target.value)}>
          <Styled.ContentTitle>시험유형</Styled.ContentTitle>
        <Styled.FormLabel>
          <Styled.FormCheckMulti name="examType" id="normal" value="족보" />
          <Styled.FormCheckText>족보</Styled.FormCheckText>
        </Styled.FormLabel>
        <Styled.FormLabel>
          <Styled.FormCheckMulti name="examType" id="normal" value="교재" />
          <Styled.FormCheckText>교재</Styled.FormCheckText>
        </Styled.FormLabel>
        <Styled.FormLabel>
          <Styled.FormCheckMulti name="examType" id="normal" value="PPT"/>
          <Styled.FormCheckText>PPT</Styled.FormCheckText>
        </Styled.FormLabel>
        <Styled.FormLabel>
          <Styled.FormCheckMulti name="examType" id="normal" value="필기" />
          <Styled.FormCheckText>필기</Styled.FormCheckText>
        </Styled.FormLabel>
        </Styled.Content>
        <Styled.Content id="group" onChange={(e)=>handleExam(e.target.checked, e.target.value)}>
        <Styled.ContentTitle />
        <Styled.FormLabel>
          <Styled.FormCheckMulti name="examType" id="normal" value="응용" />
          <Styled.FormCheckText>응용</Styled.FormCheckText>
        </Styled.FormLabel>
        <Styled.FormLabel>
          <Styled.FormCheckMulti name="examType" id="normal" value="실습" />
          <Styled.FormCheckText>실습</Styled.FormCheckText>
        </Styled.FormLabel>
        <Styled.FormLabel>
          <Styled.FormCheckMulti name="examType" id="normal" value="과제" />
          <Styled.FormCheckText>과제</Styled.FormCheckText>
        </Styled.FormLabel>
        </Styled.Content>
      </Styled.ContentWrapper>
      <Styled.TextField
        placeholder='시험에 대한 정보, 공부법, 문제유형 등을 자유롭게 작성해주세요 :)'
        onChange={onChangeContent}
        rows="15"
      />
      <Styled.Wrapper id='button'>
        <Styled.EditButton onClick={onTest}>작성하기 (+20P)</Styled.EditButton>
      </Styled.Wrapper>
    </Styled.Wrapper>
  );
};
export default Edittestinfo;
