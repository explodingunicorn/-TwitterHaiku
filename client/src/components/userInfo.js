import React from 'react';
import { css } from 'emotion';
import colors from 'styles/colors';

const userInfoClass = css({
  backgroundColor: 'white',
  border: `1px solid ${colors.lightGray}`,
  boxShadow: colors.shadow
});

const UserInfo = ({data}) => {
  return (
    <div className={userInfoClass}>
      {
        data.user ? <h4>{data.user.user}</h4> : <div/>
      }
    </div>
  )
}

export default UserInfo;