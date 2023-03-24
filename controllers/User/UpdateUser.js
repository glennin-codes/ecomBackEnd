// Update user by ID
app.put('/api/user/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, location, school, longitude, latitude } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        email,
        phone,
        location,
        school,
        longitude,
        latitude
      }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  