import { PropTypes } from 'prop-types';

import { memo } from 'react';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from '../ImageGallery/ImageGallery.module.css';

const ImageGallery = ({ items, onClick }) => {
  return (
    <ul className={styles.ImageGallery}>
      {items.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          onClick={onClick}
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};

export default memo(ImageGallery);

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id:PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
};
