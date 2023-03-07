import MissingAuthenticationApiRoute from './MissingAuthenticationApiRoute';

type Props = {
  params: {
    exampleType: string;
  };
};

export default function MissingAuthenticationApiRoutePage(props: Props) {
  return (
    <MissingAuthenticationApiRoute exampleType={props.params.exampleType} />
  );
}
