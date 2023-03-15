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
  imperialHeightMeasurementType,
  imperialWeightMeasurementType,
}: {
  weightLevelMessageEnabled: boolean;
  styleCalcSum?: any;
  styleWeightMessage?: any;
  styleCalcTitle?: any;
  styleCalcContent?: any;
  heightStepCount: number;
  metricHeightMax: number;
  metricHeightMin: number;
  imperialHeightMax: number;
  imperialHeightMin: number;
  styleHeightSlider?: any;
  styleHeightSliderTitleNum?: any;
  styleHeightSliderTitle?: any;
  weightStepCount: number;
  metricWeightMax: number;
  metricWeightMin: number;
  imperialWeightMax: number;
  imperialWeightMin: number;
  styleWeightSlider?: any;
  styleWeightSliderTitleNum?: any;
  styleWeightSliderTitle?: any;
  underWeightMessage: string;
  averageWeightMessage: string;
  overWeightMessage: string;
  obeseMessage: string;
  defaultMeasurementType: string;
  imperialHeightMeasurementType: string;
  imperialWeightMeasurementType: string;
}) => {
  const weightRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);

  const measurementRef = useRef<HTMLInputElement>(null);

  const [weight, setWeight] = useState(metricWeightMin);
  const [height, setheight] = useState(metricHeightMin);
  const [measurementType, setMeasurementType] = useState(
    defaultMeasurementType
  );

  const calculationMetric = () => {
    const heightNum = height / 100;
    return parseFloat((weight / (heightNum * heightNum)).toFixed(1));
  };

  const calculationImperial = () => {
    return parseFloat(((weight / (height * height)) * 703).toFixed(1));
  };

  const calc =
    measurementType === 'metric' ? calculationMetric() : calculationImperial();

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
      setWeight(parseInt(weightRef.current.value));
    }
  };

  const heightHandler = () => {
    if (heightRef.current != null) {
      setheight(parseInt(heightRef.current.value));
    }
  };

  const measurementMetricHandler = () => {
    if (measurementRef.current != null) {
      console.log(measurementRef.current.value);
      setMeasurementType('metric');
      setWeight(metricWeightMin);
      setheight(metricHeightMin);
    }
  };

  const measurementImperialHandler = () => {
    if (measurementRef.current != null) {
      setMeasurementType('imperial');
      setWeight(imperialWeightMin);
      setheight(imperialHeightMin);
    }
  };

  const convertToFeet = () => {
    let feet = Math.floor(height / 12);
    let inches = height - feet * 12;
    if (inches === 0) {
      return feet + 'ft';
    }
    return feet + 'ft ' + inches + 'in';
  };

  const convertToStones = () => {
    let stones = Math.floor(weight / 14);
    let pounds = weight - stones * 14;
    if (pounds === 0) {
      return stones + ' st';
    }
    return stones + ' st ' + pounds + ' lbs';
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
              {measurementType === 'metric'
                ? weight
                : imperialWeightMeasurementType === 'stone'
                ? convertToStones()
                : weight + ' lbs'}{' '}
              {measurementType === 'metric' ? 'kg' : ''}
            </label>
          </div>
          <input
            className={styles.bmiSlider}
            style={styleWeightSlider}
            type="range"
            id="weight"
            min={
              measurementType === 'metric' ? metricWeightMin : imperialWeightMin
            }
            max={
              measurementType === 'metric' ? metricWeightMax : imperialWeightMax
            }
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
              {measurementType === 'metric'
                ? height
                : imperialHeightMeasurementType === 'feet'
                ? convertToFeet()
                : height + ' in'}{' '}
              {measurementType === 'metric' ? 'cm' : ''}
            </label>
          </div>
          <input
            className={styles.bmiSlider}
            style={styleHeightSlider}
            type="range"
            id="height"
            value={height}
            ref={heightRef}
            min={
              measurementType === 'metric' ? metricHeightMin : imperialHeightMin
            }
            max={
              measurementType === 'metric' ? metricHeightMax : imperialHeightMax
            }
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
