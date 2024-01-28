import styled from 'styled-components';
import { Field, Form } from 'formik';
import Select from 'react-select';
import { baseTheme } from 'components/theme';

const { duration } = baseTheme.animation;
const { cubicBezier } = baseTheme.animation;

export const InputText = styled.p`
  margin-bottom: 12px;
  line-height: 1.25;
`;

export const AmountContainer = styled.div`
  width: 194px;
  height: 44px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlusMinusBtn = styled.button`
  width: 44px;
  height: 44px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border-radius: 30px;
  border: 1px solid ${baseTheme.colors.violet};
  background: ${baseTheme.colors.white};
  box-shadow: 0px 2px 4px 0px rgba(64, 123, 255, 0.2);

  & svg {
    width: 24px;
    height: 24px;
  }

  & use {
    fill: ${baseTheme.colors.blue};
    transition: fill ${duration} ${cubicBezier};
  }

  &:hover use {
    fill: ${baseTheme.colors.orange};
  }
`;

export const AmountSpan = styled.span`
  color: ${baseTheme.colors.blue};
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.33;
`;

export const AmountDiv = styled.div`
  width: 92px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 40px;
  background: ${baseTheme.colors.violet_light};
`;

export const FormContainer = styled(Form)`
  width: 100%;
`;

export const InputTimeLabel = styled.label`
  text-align: left;
  margin-bottom: 24px;
  line-height: 1.25;
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

export const InputVolumeLabel = styled.label`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.11;

  text-align: left;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

export const TimeSelect = styled(Select)`
  width: 120px;
  height: 44px;
  border-radius: 6px;
  margin: 0;

  .MyDropdown__control {
    height: 44px;
    border: 1px solid ${baseTheme.colors.violet_light};
    cursor: pointer;
  }

  .MyDropdown__control:hover {
    border: 1px solid ${baseTheme.colors.violet_light};
  }

  .MyDropdown__indicators {
    display: none;
  }

  .MyDropdown__value-container {
    padding: 0px 10px;
  }

  .MyDropdown__single-value {
    color: ${baseTheme.colors.blue};
    line-height: 1.25;
  }

  .MyDropdown__menu {
    width: 88px;
    color: ${baseTheme.colors.blue};
  }

  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;

export const VolumeInput = styled(Field)`
  width: 120px;
  height: 44px;
  border-radius: 6px;
  border: 1px solid ${baseTheme.colors.violet_light};
  margin: 0;
  padding: 12px 10px;
  position: relative;

  color: ${baseTheme.colors.blue};
  line-height: 1.25;

  &::-webkit-calendar-picker-indicator {
    display: block;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    background: transparent;
  }

  &:focus-visible {
    outline: 0;
    outline-offset: 0;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;

export const AmountLabel = styled.label`
  margin-bottom: 16px;
  color: ${baseTheme.colors.blue};
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.33;

  @media screen and (min-width: 768px) {
    width: 72px;
    height: 24px;
    margin: 0;
  }
  @media only screen and (min-width: 1440px) {
  }
`;

export const SaveBtn = styled.button`
  width: 100%;
  display: flex;
  padding: 8px 30px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background: ${baseTheme.colors.blue};
  box-shadow: 0px 4px 8px 0px rgba(64, 123, 255, 0.34);

  transition: box-shadow ${duration} ${cubicBezier};

  & span {
    color: ${baseTheme.colors.white};
    line-height: 1.25;
  }

  &:hover {
    box-shadow: 0px 4px 14px 0px rgba(64, 123, 255, 0.54);
    cursor: pointer;
  }

  &:active {
    box-shadow: 0 0;
  }

  @media screen and (min-width: 768px) {
    width: 160px;
    height: 44px;
  }
  @media only screen and (min-width: 1440px) {
  }
`;

export const SaveVolumeDiv = styled.div`
  @media screen and (min-width: 768px) {
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: flex-end;
    gap: 24px;
    align-items: center;
  }
  @media only screen and (min-width: 1440px) {
  }
`;
