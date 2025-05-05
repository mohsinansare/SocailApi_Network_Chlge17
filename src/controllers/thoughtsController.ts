import { User } from '../models/index.js';
import thoughts from '../models/videos.js'; // Ensure correct import
import { Request, Response } from 'express';


  export const getthoughts = async (_req: Request, res: Response) => {
    try {
      const foundthoughts = await thoughts.find();
      res.json(foundthoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSinglethoughts = async (req: Request, res: Response) => {
    try {
      const singlethoughts = await thoughts.findOne({ _id: req.params.thoughtsId })
  
      if (!singlethoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }
  
      res.json(singlethoughts);
      return; 
    } catch (err) {
      res.status(500).json(err);
    }
  
    return;
  }

  // create a new thoughts
  export const createthoughts = async (req: Request, res: Response) => {
    try {
      const newthoughts = await thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newthoughts._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({
          message: 'thoughts created, but found no user with that ID',
        });
      }
  
      res.json('Created the thoughts 🎉');
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
    return;
  }

  export const updatethoughts = async (req: Request, res: Response) => {
    try {
      const updatedthoughts = await thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!updatedthoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }
  
      res.json(updatedthoughts);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return; 
    }
  }

  export const deletethoughts = async (req: Request, res: Response) => {
    try {
      const deletedthoughts = await thoughts.findOneAndDelete({ _id: req.params.thoughtsId });
  
      if (!deletedthoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }
  
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtsId },
        { $pull: { thoughts: req.params.thoughtsId } },
        { new: true }
      );
  
      if (!user) {
        return res
          .status(404)
          .json({ message: 'thoughts created but no user with this id!' });
      }
  
      res.json({ message: 'thoughts successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  
    return; 
  }

  // Add a thoughts response
  export const addthoughtsResponse = async (req: Request, res: Response) => {
    try {
      const updatedthoughts = await thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $addToSet: { responses: req.body } },
        { runValidators: true, new: true }
      );
  
      if (!updatedthoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }
  
      res.json(updatedthoughts);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // Remove thoughts response
  export const removethoughtsResponse = async (req: Request, res: Response) => {
    try {
      const updatedthoughts = await thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { reactions: { responseId: req.params.responseId } } },
        { runValidators: true, new: true }
      )
  
      if (!updatedthoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }
  
      res.json(updatedthoughts);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }
