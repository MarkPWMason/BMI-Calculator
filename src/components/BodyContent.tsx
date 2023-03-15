import React from 'react';
import BmiCalc from './BmiCalc';

import styles from './BodyContent.module.css';

const BodyContent = () => {
  return (
    <div className={styles.container}>
      <BmiCalc
        weightLevelMessageEnabled={true}
        heightStepCount={'1'}
        weightStepCount={'1'}
        metricHeightMax={'300'}
        metricHeightMin={'140'}
        metricWeightMin={'40'}
        metricWeightMax={'300'}
        imperialHeightMin={'55'}
        imperialHeightMax={'120'}
        imperialWeightMin={'90'}
        imperialWeightMax={'660'}
        underWeightMessage={'underweight'}
        averageWeightMessage={'average'}
        overWeightMessage={'overweight'}
        obeseMessage={'obese'}
        defaultMeasurementType={'metric'}
      />
    </div>
  );
};

export default BodyContent;
