import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import useFetch from '../../hooks/useFetch';
import Text from '../atoms/Text';
import Report from '../../utils/report';
import { DAILY_API } from '../../utils/config';

const Icon = styled(FontAwesomeIcon)`
  color: steelblue;
`;

const TextWraper = styled.div`
  padding: 10px;
`;

const TextContainer = styled.div`
  padding: 5px 0;
`;

function SummaryWidget({ connectionType }: { connectionType: string }) {
  const { data, loading } = useFetch(DAILY_API);

  let [clickCnt, title, label, diffPrevDayCnt] = ['', '', '', 0];

  if (!loading && data) {
    title = connectionType === 'user' ? '접속유저' : '접속횟수';
    const myReport = new Report(connectionType, data);
    clickCnt = myReport.getTotalEventCnt().toLocaleString('ko-KR');
    label = myReport.getDataLabel();
    diffPrevDayCnt = myReport.getDiffPrevDayCnt();
  }

  return (
    <TextWraper>
      <TextContainer>
        <Text color="steelblue" weight="500">
          {title}
        </Text>
      </TextContainer>
      <TextContainer>
        <Text
          color="gray"
          borderRadius="15%"
          backgroundColor="lightgray"
          margin="0 5px 0 0"
          size="14px"
        >
          SUM
        </Text>
        <Text color="gray" size="14px">
          {label}
        </Text>
      </TextContainer>
      <TextContainer>
        <Text color="black" weight="bold" size="30px">
          {clickCnt}
        </Text>
      </TextContainer>
      <TextContainer>
        {+diffPrevDayCnt < 0 ? (
          <Icon icon={faArrowDown} />
        ) : (
          <Icon icon={faArrowUp} />
        )}
        <Text color="steelblue" margin="0 0 0 5px">
          {diffPrevDayCnt.toLocaleString('ko-KR')}
        </Text>
      </TextContainer>
    </TextWraper>
  );
}

export default SummaryWidget;
