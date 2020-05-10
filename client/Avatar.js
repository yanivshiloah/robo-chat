import React, {useEffect, useState} from 'react';
import styles from 'styled-components';

const AvatarStyle = styles.img`
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    box-shadow: ${props => props.primary ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' : 'none'};
    border-radius: 50%;
`

const Avatar = (props) => {
    const {username, size, primary} = props;
    const [image, setImage] = useState(null);
    useEffect(() => {
        const img = new Image();
        img.src = username ? `https://robohash.org/${username}.png?size=${size}x${size}&bgset=bg1` :
            `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfzVWX2jg5qRm_SPfWhpI8M1me7AaAlfQl2oCxJGrmOPnI3nLR&usqp=CAU`;
        img.onError = () => {
            const newImg = new Image();
            newImg.src = username ? `https://robohash.org/${username}.png?size=${size}x${size}&bgset=bg1` :
                `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfzVWX2jg5qRm_SPfWhpI8M1me7AaAlfQl2oCxJGrmOPnI3nLR&usqp=CAU`;
            setImage(newImg);
        };
        setImage(img);
    }, []);
    return (<AvatarStyle title={props.username}
                         primary={primary}
                         size={size}
                         src={image?.src}
    />);
};

export default Avatar;
