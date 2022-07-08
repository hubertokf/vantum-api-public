module.exports = {
  postCompany: async (req, res) => {
    const { name } = req.body;
    let company = await Company.findOne({ name });
    if (company) {
      return res
        .status(400)
        .json({ message: `A empresa com nome ${name} já existe.` });
    }
    let input = req.body
    let slug = await sails.helpers.slugify(name)
    input.slug = slug

    company = await Company.create(input);
    company = await Company.findOne({ _id: company.id })
      .populate('projects')
      .populate('billing')
      .populate('customers');

    return res.status(200).json(company);
  },
  getCompany: async (req, res) => {
    const id = req.param('id');

    let company = await Company.findById(id)
      .populate('projects')
      .populate('customers')
      .populate('billing');
    if (company) {
      return res.status(200).json(company);
    }
    return res
      .status(400)
      .json({ message: 'Essa empresa não está cadastrada' });
  },
  getAll: async (req, res) => {
    const params = req.allParams();

    await Company.find(params)
      .populate('projects')
      .populate('customers')
      .populate('billing')
      .then(companies => {
        if (companies.length !== 0) {
          return res.status(200).json(companies);
        }
        return res.status(400).json({
          message: 'Não existem empresas cadastradas ou ocorreu um erro',
        });
      })
      .catch(err => {
        return res.status(400).json({ message: err });
      });
  },
  deleteCompany: async (req, res) => {
    const id = req.param('id');

    await Company.findById(id)
      .then(async company => {
        if (company) {
          await Company.deleteOne({ _id: id })
            .then(() => {
              return res.status(200).json({
                message: 'Empresa deletada com sucesso',
              });
            })
            .catch(err => {
              return res.status(400).json({ message: err });
            });
        }
        return res.status(400).json({
          message: 'Não foi possível deletar pois empresa não existe',
        });
      })
      .catch(err => {
        return res.status(400).json({ message: err });
      });
  },
  putCompany: async (req, res) => {
    const id = req.param('id');
    // if (req.body.name !== null) {
    //   const name = req.body.name;
    //   const result = await Company.findOne({ name });
    //   if (result) {
    //     return res
    //       .status(400)
    //       .json({ message: `Já existe uma empresa com o nome: ${name}` });
    //   }
    // }
    await Company.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: req.body },
      { new: true }
    )
      .populate('projects')
      .populate('customers')
      .populate('billing')
      .then(company => {
        res.status(200).json(company);
      })
      .catch(err => res.status(400).json(err));
  },
  addCustomer: async (req, res) => {
    const { id, customerId } = req.params;

    let customer = await User.findById(customerId);

    await Company.findOneAndUpdate(
      {
        _id: id,
      },
      { $push: { customers: customer } },
      { new: true }
    )
      .populate('projects')
      .populate('billing')
      .populate('customers')
      .then(company => {
        res.status(200).json(company);
      })
      .catch(err => res.status(400).json(err));
  },

  addProject: async (req, res) => {
    const { id, projectId } = req.params;

    let project = await Project.findById(projectId);

    await Company.findOneAndUpdate(
      {
        _id: id,
      },
      { $push: { projects: project } },
      { new: true }
    )
      .populate('projects')
      .populate('billing')
      .populate('customers')
      .then(company => {
        res.status(200).json(company);
      })
      .catch(err => res.status(400).json(err));
  },
};
