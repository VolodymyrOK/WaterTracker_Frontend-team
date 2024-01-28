import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import validationSchema from '../schemas/validationSchema';
import FormInput from '../utils/FormInput/FormInput';
import Button from '../utils/Button/Button';
import Modal from '../utils/Modal/Modal';
import {
  ModalBox,
  ModalHeader,
  GenderFormulas,
  ItemsGenders,
  Formulas,
  VolumeNorm,
  StyledForm,
  FormTitle,
  Genders,
  Required,
  L,
  SaveWrapper,
  ErrorMessage,
  RadioWrapper,
  CloseBtn,
} from './DailyNormaModal.styled';
import { useContext } from 'react';
import { ModalContext } from '../ModalProvider/ModalProvider';
import { useDispatch } from 'react-redux';
import { updateDailyNorma } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';
import { toast } from 'react-toastify';
import sprite from '../../../images/sprite.svg';

const DailyNormaModal = () => {
  const toggleModal = useContext(ModalContext);

  const dispatch = useDispatch();

  const { user } = useAuth();

  const [calculatedWaterAmount, setCalculatedWaterAmount] = useState(0);

  const calculateWaterAmount = useCallback(values => {
    const weightCoefficient = values.gender === 'female' ? 0.03 : 0.04;
    const timeCoefficient = values.gender === 'female' ? 0.4 : 0.6;
    if (values.weight >= 0 && values.activityTime >= 0) {
      const calculatedAmount =
        values.weight * weightCoefficient +
        values.activityTime * timeCoefficient;
      setCalculatedWaterAmount(calculatedAmount.toFixed(1));
    } else {
      setCalculatedWaterAmount('Error');
    }
  }, []);

  const handleInputChange = e => {
    formik.handleChange(e);
  };

  const handleSubmit = async () => {
    let amountWater = formik.values.drankWaterAmount * 1000;

    if (amountWater >= 0 && amountWater <= 15000) {
      dispatch(updateDailyNorma(amountWater));
      toast.success('Daily norma successfully updated');
    } else {
      toast.warning(
        'The amount of water must be a positive number and no more than 15 liters'
      );
    }
    formik.resetForm();
    toggleModal();
  };

  const formik = useFormik({
    initialValues: {
      gender: user.gender,
      weight: 0,
      activityTime: 0,
      drankWaterAmount: 0,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleFocus = (e, fieldName) => {
    if (fieldName !== 'drankWaterAmount') {
      e.target.value = '';
    }
  };

  const handleBlur = (e, fieldName) => {
    if (e.target.value >= 0) {
      if (fieldName !== 'drankWaterAmount') {
        formik.setFieldValue('drankWaterAmount', calculatedWaterAmount);
      }
    } else {
      formik.setFieldValue('drankWaterAmount', 0);
      toast.warning('Negative numbers are not allowed');
    }
  };

  useEffect(() => {
    calculateWaterAmount(formik.values);
  }, [calculateWaterAmount, formik.values]);

  const onClickModalClose = () => {
    toggleModal();
  };

  return (
    <Modal onClose={toggleModal}>
      <ModalBox>
        <>
          <ModalHeader>
            My daily norma
            <CloseBtn onClick={onClickModalClose}>
              <svg>
                <use href={sprite + '#close'}></use>
              </svg>
            </CloseBtn>
          </ModalHeader>

          <GenderFormulas>
            <ItemsGenders>
              For girl:
              <Formulas> V=(M*0.03) + (T*0.4)</Formulas>
            </ItemsGenders>
            <ItemsGenders>
              For man:
              <Formulas> V=(M*0.04) + (T*0.6)</Formulas>
            </ItemsGenders>
          </GenderFormulas>

          <VolumeNorm>
            *V is the volume of the water norm in liters per day, M is your body
            weight, T is the time of active sports, or another type of activity
            commensurate in terms of loads (in the absence of these, you must
            set 0)
          </VolumeNorm>

          <StyledForm>
            <FormTitle>Calculate your rate:</FormTitle>

            <Genders>
              <RadioWrapper>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={() => formik.setFieldValue('gender', 'female')}
                    checked={formik.values.gender === 'female'}
                  />
                  <span>For women</span>
                </label>
              </RadioWrapper>
              <RadioWrapper>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formik.values.gender === 'male'}
                    onChange={() => formik.setFieldValue('gender', 'male')}
                  />
                  <span>For man</span>
                </label>
              </RadioWrapper>
            </Genders>

            <FormInput
              label="Enter your weight in kilograms:"
              inputType="dailyNorma"
              value={formik.values.weight}
              onChange={e => handleInputChange(e, 'weight')}
              onFocus={e => handleFocus(e, 'weight')}
              onBlur={e => handleBlur(e, 'weight')}
              name="weight"
              type="number"
              min="0"
              step="0.1"
              error={formik.touched.weight && formik.errors.weight}
            />

            <FormInput
              label="Enter the time of active participation in sports or other
                activities with a high physical load:"
              inputType="dailyNorma"
              value={formik.values.activityTime}
              onChange={e => handleInputChange(e, 'activityTime')}
              onFocus={e => handleFocus(e, 'activityTime')}
              onBlur={e => handleBlur(e, 'activityTime')}
              name="activityTime"
              type="number"
              min="0"
              step="0.1"
              error={formik.touched.activityTime && formik.errors.activityTime}
            />

            <Required>
              <>The required amount of water in liters per day:</>
              <L>
                {isNaN(calculatedWaterAmount) || calculatedWaterAmount < 0 ? (
                  <ErrorMessage>Input data error</ErrorMessage>
                ) : (
                  `${calculatedWaterAmount} L`
                )}
              </L>
            </Required>

            <FormInput
              label="Write down how much water you will drink:"
              inputType="dailyNorma"
              value={formik.values.drankWaterAmount}
              onChange={e => handleInputChange(e, 'drankWaterAmount')}
              onFocus={e => handleFocus(e, 'drankWaterAmount')}
              onBlur={e => handleBlur(e, 'drankWaterAmount')}
              name="drankWaterAmount"
              type="number"
              min="0"
              max="15"
              step="0.1"
              error={
                formik.touched.drankWaterAmount &&
                formik.errors.drankWaterAmount
              }
            />

            <SaveWrapper>
              <Button type="submit" onClick={handleSubmit}>
                Save
              </Button>
            </SaveWrapper>
          </StyledForm>
        </>
      </ModalBox>
    </Modal>
  );
};

export default DailyNormaModal;
