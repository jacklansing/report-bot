import * as Yup from 'yup';

const youtubeURLValidator = Yup.string()
  .url('Did not provide a valid URL.')
  .matches(/(youtube|youtu.be)/, 'Not a youtube link.')
  .required('Did not provide a youtube link.');

const targetPlayerValidator = Yup.string().required(
  'Did not provide a target player.',
);

const ReportYoutubeschema = Yup.object().shape({
  targetPlayer: targetPlayerValidator,
  youtubeURL: youtubeURLValidator,
});

export default ReportYoutubeschema;
