import React from 'react';
import { Link } from 'react-router-dom';

import { FaArrowAltCircleLeft} from 'react-icons/fa'

interface iProps {
    url: string
}

export const Back:React.FC<iProps> = (props) => {
  return (
    <Link to={props.url} className='btn btn-reverse btn-back'>
        <FaArrowAltCircleLeft />
        Go back
    </Link>
  )
}
