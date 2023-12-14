import Reports from '../models/ReportModel.js';
import User from '../models/UserModel.js';
import { Op } from 'sequelize';

export const getReports = async (req, res) => {
  try {
    let response;
    if (req.role === 'admin') {
      response = await Reports.findAll({
        attributes: ['uuid', 'report_content', 'image_url', 'report_status'],
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
          },
        ],
      });
    } else {
      response = await Reports.findAll({
        attributes: ['uuid', 'report_content', 'image_url', 'report_status'],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await Reports.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!report) return res.status(404).json({ msg: 'Data tidak ditemukan' });

    let response;
    if (req.role === 'admin') {
      response = await Reports.findOne({
        attributes: ['uuid', 'report_content', 'image_url', 'report_status'],
        where: {
          id: report.id,
        },
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
          },
        ],
      });
    } else {
      response = await Reports.findOne({
        attributes: ['uuid', 'report_content', 'image_url', 'report_status'],
        where: {
          [Op.and]: [{ id: report.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createReport = async (req, res) => {
  const { report_content, image_url, report_status } = req.body;
  try {
    await Reports.create({
      report_content: report_content,
      image_url: 'hdasdhad',
      report_status: 'pending',
      userId: req.userId,
    });
    res.status(201).json({ msg: 'Report Created Successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateReport = async (req, res) => {
  try {
    const report = await Reports.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!report) return res.status(404).json({ msg: 'Data tidak ditemukan' });

    const { report_content, image_url, report_status } = req.body;
    if (req.role === 'admin') {
      await Reports.update(
        { report_content, image_url, report_status },
        {
          where: {
            id: report.id,
          },
        }
      );
    } else {
      if (req.userId !== report.userId) return res.status(403).json({ msg: 'Akses terlarang' });
      await Reports.update(
        { report_content, image_url, report_status },
        {
          where: {
            [Op.and]: [{ id: report.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: 'Report updated successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await Reports.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!report) return res.status(404).json({ msg: 'Data tidak ditemukan' });

    if (req.role === 'admin') {
      await Reports.destroy({
        where: {
          id: report.id,
        },
      });
    } else {
      if (req.userId !== report.userId) return res.status(403).json({ msg: 'Akses terlarang' });
      await Reports.destroy({
        where: {
          [Op.and]: [{ id: report.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
