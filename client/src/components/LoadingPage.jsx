// Loading.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

function Loading() {
  return (
    <div style={styles.loadingContainer}>
      <ClipLoader color="#36D7B7" size={150} />
    </div>
  );
}

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }
};

export default Loading;
