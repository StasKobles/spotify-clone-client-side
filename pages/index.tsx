import MainLayout from "../layouts/MainLayout";

const index = () => {
  return (
    <>
      <MainLayout>
        <div className="center">
          <h1>Welcome to my music pet project!</h1>
          <h3>Here ypu can find best tracks ever or add them</h3>
        </div>
        <style jsx>
          {`
            .center {
              margin-top: 150px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
          `}
        </style>
      </MainLayout>
    </>
  );
};

export default index;
