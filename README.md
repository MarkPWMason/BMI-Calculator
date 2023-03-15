# How it works

Takes in weight in kg or lbs and height in cm or inches then works out your BMI, based on whether you choose the metric or imperial measurement system.

# What its for

Adding a Typescript BMI calculator to your React website.

# The different parameters that can be passed - what they do, whether they are optional

The different parameters that can be passed to the component are:

## weightLevelMessageEnabled

Boolean to decide if you show the weight level message.

## styleCalcSum, styleWeightMessage, styleCalcTitle, styleCalcContent, styleHeightSlider, styleHeightSliderTitleNum, styleHeightSliderTitle, styleWeightSlider, styleWeightSliderTitleNum, styleWeightSliderTitle

Styles that allow you override the existing styles for each of the individual divs that make up this component. -- These are optional parameters.

## metricHeightMax, metricHeightMin

Takes the height min and max for the slider in metric measurements.

## metricWeightMax, metricWeightMin

Takes the weight min and max for the slider in metric measurements.

## imperialHeightMax, imperialHeightMin

Takes the height min and max for slider in imperial measurements.

## imperialWeightMax, imperialWeightMin

Takes the weight min and max for slider in imperial measurements.

## heightStepCount, weightStepCount

Takes in the step count, this is how much the step increases by as you slide it.

## underWeightMessage, averageWeightMessage, overWeightMessage, obeseMessage

Message you would like to display for certain weights.

## defaultMeasurementType

Takes in default measurement type such as 'metric' or 'imperial'

## imperialHeightMeasurementType

Takes in the height type for imperial I.E feet or inches.

## imperialWeightMeasurementType

Takes in the weight type for imperial I.E stone or pounds.

# Example code:

```JSX
      <BmiCalc
        weightLevelMessageEnabled={true}
        heightStepCount={1}
        weightStepCount={1}
        metricHeightMax={300}
        metricHeightMin={140}
        metricWeightMin={40}
        metricWeightMax={300}
        imperialHeightMin={55}
        imperialHeightMax={120}
        imperialWeightMin={90}
        imperialWeightMax={660}
        underWeightMessage={'underweight'}
        averageWeightMessage={'average'}
        overWeightMessage={'overweight'}
        obeseMessage={'obese'}
        defaultMeasurementType={'metric'}
        imperialHeightMeasurementType={'feet'}
        imperialWeightMeasurementType={'stone'}
      />
```
