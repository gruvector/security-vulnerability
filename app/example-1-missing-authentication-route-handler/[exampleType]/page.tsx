import MissingAuthenticationApiRoute from './MissingAuthenticationApiRoute';

export const dynamic = 'force-dynamic';

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
