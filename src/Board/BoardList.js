import React from 'react';
import {Link} from "react-router-dom";

import BoardListItem from './BoardListItem';

const BoardList = (props)=> {
    return (
      <div>
           {props.items.map(item => <BoardListItem key={item.id} post={item}/> )}
           <div>
               {props.user.user_data && <Link to='/board/add'>새글 쓰기</Link>}
           </div>
      </div>
  );
};

export default BoardList;