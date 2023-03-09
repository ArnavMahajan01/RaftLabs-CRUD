const CrudOperations = require("../models/Crud");

exports.create = async function (req, res) {
  /* Initializing the schema and putting in CRUDcreate */
  const user = req.user;
  const CRUDcreate = new CrudOperations({
    username: user.name,
    email: user.email,
    identifier: req.body.identifier,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  /* Try Catch */
  try {
    /* Saving the data in mongoose */
    const savedCRUD = await CRUDcreate.save();
    /* Sending the response back */
    res.status(200);
    res.send(savedCRUD);
  } catch (err) {
    /* Sending the error back */
    res.status(400).send(err);
  }
};

exports.read = async function (req, res) {
  /* Using find() for reading all the data */
  const user = req.user;
  const page = req.query.p || 0;
  const amountPerPage = 2;

  const CrudRead = await CrudOperations.find()
    .sort({ identifier: 1 })
    .skip(page * amountPerPage)
    .limit(amountPerPage);

  try {
    res.status(200).send({ data: CrudRead });
  } catch (err) {
    console.log(err);
    res.status(403).send({ msg: err });
  }
};

exports.update = async function (req, res) {
  /* Taking the id */
  try {
    /* Using findByIdAndUpdate */
    const user = req.user;
    const CRUDupdate = await CrudOperations.findOneAndUpdate(
      { email: user.email },

      /* Setting the value of identifier as 1967 of corresponding id */
      {
        $set: {
          identifier: 1969,
        },
      },
      {
        useFindAndModify: false,
      }
    );

    /* Sending the response back to the server */
    res.status(200).send(CRUDupdate);
  } catch (err) {
    /* Sending error back to the server */
    res.status(400).send(err);
  }
};

exports.delete = async function (req, res) {
  /* Taking the id of the collection */
  const user = req.user;

  /* Using Try and catch for deletion */
  try {
    /* Using findbyIdAndRemove operation to remove
        the data with corresponding email */
    const CRUDdelete = await CrudOperations.findOneAndUpdate(
      user.email,
      function (err, res) {
        if (err) {
          /* Sending error back to the server */
          res.status(400).send(err);
          console.log(err);
        } else {
          /* Sending the response back to the server */
          console.log("Removed User : ", res);
        }
      },
      {
        useFindAndModify: false,
      }
    );
    res.status(200).json({ msg: user + " deleted a query" });
  } catch (err) {
    res.status(400).send(err);
  }
};
