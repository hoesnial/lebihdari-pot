import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { deleteOrder, updateOrderStatus } from "@/lib/actions/order";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Orders
      </h1>
      <p className="mt-2 text-sm text-muted">
        Manage customer orders and update their status.
      </p>

      <div className="mt-8 space-y-4">
        {orders.length === 0 && (
          <p className="text-sm text-muted">No orders yet.</p>
        )}
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-[24px] border border-border/20 bg-card p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      statusColors[order.status] || "bg-gray-100"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="text-xs text-muted">
                    {order.createdAt.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="font-semibold text-foreground">
                    {order.customerName}
                  </p>
                  <p className="text-sm text-muted">{order.customerEmail}</p>
                  {order.customerPhone && (
                    <p className="text-sm text-muted">{order.customerPhone}</p>
                  )}
                  {order.notes && (
                    <p className="text-sm italic text-muted">
                      Notes: {order.notes}
                    </p>
                  )}
                </div>
                <div className="mt-3 space-y-1">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-sm text-foreground">
                      {item.product.name} x{item.quantity} —
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  ))}
                </div>
                <p className="mt-2 font-heading text-lg font-bold text-accent">
                  Total: Rp {order.total.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex shrink-0 items-start gap-3">
                <form action={updateOrderStatus}>
                  <input type="hidden" name="id" value={order.id} />
                  <select
                    name="status"
                    defaultValue={order.status}
                    onChange={(e) => e.target.form?.requestSubmit()}
                    className="rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </form>
                <form action={deleteOrder.bind(null, order.id)}>
                  <button className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
