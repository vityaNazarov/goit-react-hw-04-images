import { PropTypes } from 'prop-types';

import styles from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => onClick(largeImageURL, tags)}
    >
      <img src={webformatURL} alt={tags} className={styles.ImageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  tags: PropTypes.string,
  largeImageURL:PropTypes.string,
}
