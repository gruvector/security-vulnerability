import MissingAuthorizationApiRoute from './MissingAuthorizationApiRoute';

type Props = {
  params: {
    exampleType: string;
  };
};

export default function MissingAuthorizationApiRoutePage(props: Props) {
  return (
    <MissingAuthorizationApiRoute exampleType={props.params.exampleType} />
  );
}
