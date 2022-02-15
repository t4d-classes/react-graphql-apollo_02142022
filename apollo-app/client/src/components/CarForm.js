import PropTypes from 'prop-types';

import { useForm } from '../hooks/useForm';

export const CarForm = ({ buttonText, onSubmitCar, colorLookup }) => {

  const [carForm, change, resetCarForm ] = useForm({
    make: '', model: '', year: 1900, color: '', price: 0
  });

  const submitCar = () => {
    onSubmitCar({ ...carForm });
    resetCarForm();
  };

  return (
    <form>
      <label>
        Make
        <input type="text" name="make"
          value={carForm.make} onChange={change} />
      </label>
      <label>
        Model
        <input type="text" name="model"
          value={carForm.model} onChange={change} />
      </label>
      <label>
        Year
        <input type="number" name="year"
          value={carForm.year} onChange={change} />
      </label>
      <label>
        Color
        <select name="color" value={carForm.color} onChange={change}>
          {colorLookup.map(color =>
            <option key={color} value={color}>{color}</option>)}
        </select>
      </label>
      <label>
        Price
        <input type="number" name="price"
          value={carForm.price} onChange={change} />
      </label>
      <button type="button" onClick={submitCar}>{buttonText}</button>
    </form>
  );
};

CarForm.defaultProps = {
  buttonText: 'Submit Car',
  colorLookup: [],
};

CarForm.propTypes = {
  colorLookup: PropTypes.arrayOf(PropTypes.string).isRequired,
};