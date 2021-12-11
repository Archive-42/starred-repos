const Events = require("./events-model");

const eventsController = {
  async getAll(req, res) {
    res.status(200).json(await Events.getAll());
  },
  // do we need a constraint here for admin/owner?
  async getByOwner(req, res) {
    const user_id = req.params.user_id;
    res.status(200).json(await Events.getByOwnerId(user_id));
  },
  async getByGuest(req, res) {
    const user_id = req.params.user_id;
    res.status(200).json(await Events.getByGuestId(user_id));
  },
  async getById(req, res) {
    const event_id = req.params.event_id;
    res.status(200).json(await Events.getById(event_id));
  },
  async getEventGuests(req, res) {
    const event_id = req.params.event_id;
    res.status(200).json(await Events.getAllEventGuests(event_id));
  },
  async addEvent(req, res) {
    res.status(201).json(await Events.add(req.body));
  },
  async addAGuest(req, res) {
    res.status(201).json(await Events.addGuest(req.params.event_id, req.body.guest_id));
  },
  async addAItem(req,res) {
    res.status(201).json(await Events.addItem(req.params.event_id,req.body));
  },
  async editAnEvent(req, res) {
    res.status(200).json(await Events.editEvent(req.params.event_id, req.body));
  },
  async editAResponse(req, res) {
    res.status(200).json(await Events.editResponse(req.params.event_id, req.body));
  },
  async editTheItems(req, res) {
    res.status(200).json(await Events.editItems(req.params.event_id, req.body));
  },
  async deleteAnEvent(req, res) {
    res.status(202).json(await Events.deleteEvent(req.params.event_id));
  },
  async deleteAnItem(req, res) {
    res.status(202).json(await Events.deleteItem(req.params.event_id, req.body));
  },
  async deleteAGuest(req, res) {
    res.status(202).json(await Events.deleteGuest(req.params.event_id, req.body));
  }
};

module.exports = eventsController;
