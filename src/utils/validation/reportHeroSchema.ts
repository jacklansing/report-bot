import * as Yup from 'yup';

const heroNameValidator = Yup.string()
  .min(3, 'Hero name cannot be less than 3 characters.')
  .max(99, 'Hero name cannot be more than 99 characters.')
  .required('Did not provide a hero name.');

const targetPlayerValidator = Yup.string()
  .min(3, 'Player name cannot be less than 3 characters.')
  .max(99, 'Player name cannot be more than 99 characters.')
  .required('Did not provide a target player.');

const heroDescriptonValidator = Yup.string()
  .max(1200, 'Hero description cannot exceed 1200 characters.')
  .required('Did not provide a description.');

const ReportHeroSchema = Yup.object().shape({
  targetPlayer: targetPlayerValidator,
  heroName: heroNameValidator,
  heroDescription: heroDescriptonValidator,
});

export default ReportHeroSchema;
