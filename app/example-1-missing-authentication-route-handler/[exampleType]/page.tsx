import MissingAuthenticationApiRoute from './MissingAuthenticationApiRoute';

type Props = {
  params: {
    exampleType: string;
  };
};

export const dynamic = 'force-dynamic';

export default function MissingAuthenticationApiRoutePage(props: Props) {
  return (
    <MissingAuthenticationApiRoute exampleType={props.params.exampleType} />
  );
}
