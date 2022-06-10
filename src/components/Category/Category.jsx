// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchData } from '../../app/slice/dataSlice';

// export const Category = () => {

//     const dispatch = useDispatch();
//     const { videos } = useSelector(store => store.data);

//     const filterCategory = videos.reduce((acc, curr) => acc.includes(curr.genre) ? acc : [...acc, curr.genre], ["All"]);

//     // useEffect(_ => {
//     //     dispatch(fetchData())
//     // }, [dispatch])


//     return (
//         <div className='flex gap-16'>
//             {
//                 filterCategory.map(item => <button className='category-1'>{item}</button>)
//             }
//         </div>
//     )
// }
