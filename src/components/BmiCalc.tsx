import React, { useRef, useState } from 'react';

import styles from './BmiCalc.module.css';

const BmiCalc = ({
  weightLevelMessageEnabled,
  styleCalcSum,
  styleWeightMessage,
  styleCalcTitle,
  styleCalcContent,
  heightStepCount,
  metricHeightMax,
  metricHeightMin,
  imperialHeightMax,
  imperialHeightMin,
  styleHeightSlider,
  styleHeightSliderTitleNum,
  styleHeightSliderTitle,
  weightStepCount,
  metricWeightMax,
  metricWeightMin,
  imperialWeightMax,
  imperialWeightMin,
  styleWeightSlider,
  styleWeightSliderTitleNum,
  styleWeightSliderTitle,
  underWeightMessage,
  averageWeightMessage,
  overWeightMessage,
  obeseMessage,
  defaultMeasurementType,
}: {
  weightLevelMessageEnabled: boolean;
  styleCalcSum?: any;
  styleWeightMessage?: any;
  styleCalcTitle?: any;
  styleCalcContent?: any;
  heightStepCount: string;
  metricHeightMax: string;
  metricHeightMin: string;
  imperialHeightMax: string;
  imperialHeightMin: string;
  styleHeightSlider?: any;
  styleHeightSliderTitleNum?: any;
  styleHeightSliderTitle?: any;
  weightStepCount: string;
  metricWeightMax: string;
  metricWeightMin: string;
  imperialWeightMax: string;
  imperialWeightMin: string;
  styleWeightSlider?: any;
  styleWeightSliderTitleNum?: any;
  styleWeightSliderTitle?: any;
  underWeightMessage: string;
  averageWeightMessage: string;
  overWeightMessage: string;
  obeseMessage: string;
  defaultMeasurementType: string;
}) => {
  const weightRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);

  const measurementRef = useRef<HTMLInputElement>(null);

  const [weight, setWeight] = useState(metricWeightMin);
  const [height, setheight] = useState(metricHeightMin);
  const [measurementType, setMeasurementType] = useState(defaultMeasurementType);

  const calculationMetric = () => {
    const weightNum = parseInt(weight);
    const heightNum = parseInt(height) / 100;
    return parseFloat((weightNum / (heightNum * heightNum)).toFixed(1));
  };

  const calculationImperial = () => {
    const weightNum = parseInt(weight);
    const heightNum = parseInt(height);
    return parseFloat(((weightNum / (heightNum * heightNum)) * 703).toFixed(1));
  };

  const calc = measurementType === 'metric' ? calculationMetric() : calculationImperial();

  let weightLevel = '';
  if (calc < 18.5) {
    weightLevel = underWeightMessage;
  } else if (calc > 18.5 && calc < 25) {
    weightLevel = averageWeightMessage;
  } else if (calc > 25 && calc < 30) {
    weightLevel = overWeightMessage;
  } else if (calc > 30) {
    weightLevel = obeseMessage;
  }

  const weightHandler = () => {
    if (weightRef.current != null && measurementRef.current != null) {
      setWeight(weightRef.current.value);
    }
  };

  const heightHandler = () => {
    if (heightRef.current != null) {
      setheight(heightRef.current.value);
    }
  };

  const measurementMetricHandler = () => {
    if (measurementRef.current != null) {
        console.log(measurementRef.current.value);
        setMeasurementType('metric')
        setWeight(metricWeightMin);
        setheight(metricHeightMin);
    }
  };

  const measurementImperialHandler = () => {
    if (measurementRef.current != null) {
        setMeasurementType('imperial')
        setWeight(imperialWeightMin);
        setheight(imperialHeightMin);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bmiContent}>
        <h1 className={styles.bmiTitle}>BMI Calculator</h1>
        <label htmlFor="metric">Metric</label>
        <input
          value="metric"
          checked={measurementType === 'metric'}
          type="radio"
          name="measurementType"
          id="metric"
          ref={measurementRef}
          onClick={measurementMetricHandler}
        />
        <label htmlFor="imperial">Imperial</label>
        <input
          value="imperial"
          type="radio"
          name="measurementType"
          id="imperial"
          checked={measurementType !== 'metric'}
          ref={measurementRef}
          onClick={measurementImperialHandler}
        />
        <div className={styles.bmiWeightSlider}>
          <div className={styles.bmiText}>
            <label
              className={styles.bmiSliderTitle}
              style={styleWeightSliderTitle}
              htmlFor="weight"
            >
              Weight:
            </label>
            <label
              className={styles.bmiSliderTitle}
              style={styleWeightSliderTitleNum}
              htmlFor="weight"
            >
              {weight} {measurementType === 'metric' ? 'kg' : 'lb'}
            </label>
          </div>
          <input
            className={styles.bmiSlider}
            style={styleWeightSlider}
            type="range"
            id="weight"
            min={measurementType === 'metric' ? metricWeightMin : imperialWeightMin}
            max={measurementType === 'metric' ? metricWeightMax : imperialWeightMax}
            step={weightStepCount}
            value={weight}
            ref={weightRef}
            onChange={weightHandler}
          />
        </div>
        <div className={styles.bmiHeightSlider}>
          <div className={styles.bmiText}>
            <label
              className={styles.bmiSliderTitle}
              style={styleHeightSliderTitle}
              htmlFor="height"
            >
              Height:
            </label>
            <label
              className={styles.bmiSliderTitle}
              style={styleHeightSliderTitleNum}
              htmlFor="height"
            >
              {height} {measurementType === 'metric' ? 'cm' : 'in'}
            </label>
          </div>
          <input
            className={styles.bmiSlider}
            style={styleHeightSlider}
            type="range"
            id="height"
            value={height}
            ref={heightRef}
            min={measurementType === 'metric' ? metricHeightMin : imperialHeightMin}
            max={measurementType === 'metric' ? metricHeightMax : imperialHeightMax}
            step={heightStepCount}
            onChange={heightHandler}
          />
        </div>
        <div className={styles.calcContent} style={styleCalcContent}>
          <h1 className={styles.calcContentTitle} style={styleCalcTitle}>
            Your BMI is:
          </h1>
          <p className={styles.calcContentText} style={styleCalcSum}>
            {calc}
          </p>
          {weightLevelMessageEnabled && (
            <p style={styleWeightMessage} className={styles.calcContentText}>
              {weightLevel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BmiCalc;
